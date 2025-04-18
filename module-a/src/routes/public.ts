import express from 'express';
import { query } from '../lib/db';
import { expect, field } from '../lib/validate';

const router = express.Router();

router.get("/locations", async (req, res) => {
  const {page = 1, pageSize = 6, search} = req.query as any;
  const pagination = (await query<any[]>(`
    SELECT COUNT(id) as total FROM locations
    WHERE deleted_at IS NULL
  `))[0];
  const locations = await query<any[]>(`
    SELECT id, name, slug, description, postal_code, city, address, COUNT(location_machine.id) as machine_count
    FROM locations INNER JOIN location_machine ON location_machine.location_id = locations.id
    WHERE deleted_at IS NULL ${search ? "AND INSTR(locations.name, ?)" : ""} GROUP BY locations.id LIMIT ? OFFSET ?
  `, [search, pageSize, (page - 1) * pageSize]);
  res.status(200).json({
    page: page,
    page_size: pageSize,
    total: pagination.total,
    count: locations.length,
    total_pages: Math.ceil(pagination.total / pageSize),
    previous_page_url: page == 1 ? null : `/?page=${page - 1}${pageSize ? "&pageSize=" + pageSize : ""}${search ? "&search=" + search : ""}`,
    next_page_url: `/?page=${page - 1}${pageSize ? "&pageSize=" + pageSize : ""}${search ? "&search=" + search : ""}`,
    data: locations
  });
});

router.get("/locations/:slug", async (req, res) => {
  const {slug} = req.params;
  const location = (await query<any[]>(`
    SELECT * FROM locations WHERE slug = ?
  `, [slug]))[0];
  const machines = await query<any[]>(`
    SELECT location_machine.id as id, machines.id as machine_id, type, price, weekend_price_multiplier, size_in_kg, running_time
    FROM machines INNER JOIN location_machine ON location_machine.machine_id = machines.id
    WHERE location_machine.location_id = ?
  `, [location.id]);
  machines.forEach((m) => {
    m.price = parseFloat(m.price);
    m.weekend_price = m.price * m.weekend_price_multiplier;
    delete m.weekend_price_multiplier;
  });
  res.status(201).json({
    id: location.id,
    name: location.name,
    slug: location.slug,
    description: location.description,
    opens_at: location.opens_at,
    closes_at: location.closes_at,
    location: {
      postal_code: location.postal_code,
      city: location.city,
      address: location.address,
    },
    amenities: JSON.parse(location.amenities),
    machines
  })
});

router.post("/subscribe", async (req, res) => {
  const {display_email} = req.body;
  expect(
    field("display_email", display_email).exist().string(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  );
  await query(`
    INSERT INTO subscriptions (display_email, email, nickname) VALUES (?, ?, ?)
  `, [display_email, "".replace(/\+[^\s@]+@/, "")]);
  res.status(201).json({ success: true });
});

export default router;