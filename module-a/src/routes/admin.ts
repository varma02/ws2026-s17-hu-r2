import express from 'express';
import { expect, field } from '../lib/validate';
import { query } from '../lib/db';
import { InvalidCredsError, NotFoundError, ValidationError } from '../lib/error';
import bcrypt from 'bcrypt';
import crypto from "node:crypto";
import { adminAuth } from '../lib/middleware';

const router = express.Router();

router.post("/login", async (req, res) => {
  const {username, password} = req.body;
  expect(
    field("username", username).exist().string(),
    field("password", password).exist().string()
  );
  const user = (await query<any[]>(`
    SELECT * FROM admins WHERE username = ?
  `, [username]))[0];
  if (!user || !await bcrypt.compare(password, user.password))
    throw new InvalidCredsError();
  if (!user.token) {
    const token = crypto.randomBytes(32).toString('hex');
    user.token = token;
  }
  query("UPDATE admins SET token = ?, last_login_at = NOW() WHERE username = ?", [user.token, username]);
  res.status(200).json({
    success: true,
    token: user.token,
    admin: ["id", "name", "username", "last_login_at", "created_at", "updated_at"]
      .reduce((p,v) => ({...p,[v]:user[v]}),{})
  });
});

router.use(adminAuth);

router.post("/logout", async (req, res) => {
  await query(`
    UPDATE admins SET token = NULL WHERE token = ?
  `, [req.headers.authorization?.replace("Bearer ", "")]);
  res.status(200).json({ success: true });
});

router.post("/register", async (req, res) => {
  const {name, username, password} = req.body;
  expect(
    field("name", name).exist().string(),
    field("username", username).exist().kebab(),
    field("password", password).exist().string().len(8)
  );
  try {
    await query(`
      INSERT INTO admins (name, username, password) VALUES (?,?,?)
    `, [name, username, await bcrypt.hash(password, 10)]);
  } catch (err: any) {
    if (err.code == "ER_DUP_ENTRY") throw new ValidationError({username: "field must be unique"});
    else throw err;
  }
  const user = (await query<any[]>(`
    SELECT id, name, username, last_login_at, created_at, updated_at
    FROM admins WHERE username = ?
  `, [username]))[0];
  res.status(201).json(user);
});

router.get("/list", async (req, res) => {
  const result = await query(`
    SELECT id, name, username, last_login_at, created_at, updated_at FROM admins
  `);
  res.status(200).json(result);
});

router.get("/locations", async (req, res) => {
  const result = await query(`
    SELECT id, name, slug, city, created_at, updated_at FROM locations
  `);
  res.status(200).json(result);
});

router.post("/location", async (req, res) => {
  const {name, description, opens_at, closes_at, postal_code, city, address, machine_ids, amenities} = req.body;
  expect(
    field("name", name).exist().string().len(6, 128),
    field("description", description).exist().string().len(8),
    field("opens_at", opens_at).exist().string(/^\d\d:\d\d$/),
    field("closes_at", closes_at).exist().string(/^\d\d:\d\d$/),
    field("postal_code", postal_code).exist().integer(1000, 9999),
    field("city", city).exist().string(),
    field("address", address).exist().string(),
    field("machine_ids", machine_ids).exist().array(),
    field("amenities", amenities).exist().object(),
    field("amenities.accessible", amenities?.accessible).exist().boolean(),
    field("amenities.easy_parking", amenities?.easy_parking).exist().boolean(),
    field("amenities.lounge_area", amenities?.lounge_area).exist().boolean(),
    field("amenities.music", amenities?.music).exist().boolean(),
    field("amenities.wifi", amenities?.wifi).exist().boolean()
  );
  let slug: string = name.toLowerCase().replace(" ", "-");
  let new_slug = slug;
  while (true) {
    const try_slug = await query<any[]>(`
      SELECT id FROM locations WHERE slug = ?
    `, [new_slug]);
    console.log(slug, new_slug, try_slug)
    if (try_slug.length) {
      new_slug = slug + "-" + crypto.randomBytes(10).toString('hex').slice(0, 6);
    } else {
      slug = new_slug;
      break;
    }
  }
  const result = await query<any>(`
    INSERT INTO locations (name, slug, description, opens_at, closes_at, postal_code, city, address, amenities)
    VALUES (?,?,?,?,?,?,?,?,?)
  `, [name, slug, description, opens_at, closes_at, postal_code, city, address, JSON.stringify(amenities)]);
  await query(`
    INSERT INTO location_machine (machine_id, location_id)
    VALUES ${Array.from({length: machine_ids.length}, () => "(?," + result.insertId + ")").join(",")}
  `, machine_ids);
  const location = (await query<any[]>(`
    SELECT * FROM locations WHERE id = ?
  `, [result.insertId]))[0];
  const machines = await query<any[]>(`
    SELECT location_machine.id as id, machines.id as machine_id, type, price, weekend_price_multiplier, size_in_kg, running_time
    FROM machines INNER JOIN location_machine ON location_machine.machine_id = machines.id
    WHERE location_machine.location_id = ?
  `, [result.insertId]);
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

router.put("/locations/:slug", async (req, res) => {
  const {slug} = req.params;
  const {name, description, opens_at, closes_at, postal_code, city, address, machine_ids, amenities} = req.body;
  expect(
    field("name", name).string().len(6, 128),
    field("description", description).string().len(8),
    field("opens_at", opens_at).string(/^\d\d:\d\d$/),
    field("closes_at", closes_at).string(/^\d\d:\d\d$/),
    field("postal_code", postal_code).integer(1000, 9999),
    field("city", city).string(),
    field("address", address).string(),
    field("machine_ids", machine_ids).array(),
    field("amenities", amenities).object(),
    field("amenities.accessible", amenities?.accessible).boolean(),
    field("amenities.easy_parking", amenities?.easy_parking).boolean(),
    field("amenities.lounge_area", amenities?.lounge_area).boolean(),
    field("amenities.music", amenities?.music).boolean(),
    field("amenities.wifi", amenities?.wifi).boolean()
  );
  const original_location = (await query<any[]>(`
    SELECT * FROM locations WHERE slug = ?
  `, [slug]))[0];
  if (!original_location || original_location.deleted_at) throw new NotFoundError();
  await query<any>(`
    UPDATE locations
    SET ${["name", "description", "opens_at", "closes_at", "postal_code", "city", "address", "amenities"]
      .filter((v) => req.body[v] !== undefined).map((v) => `${v} = ?`).join(", ")}
    WHERE slug = ?
  `, [name, description, opens_at, closes_at, postal_code, city, address, 
    JSON.stringify({...JSON.parse(original_location.amenities), ...amenities}), slug].filter((v) => v !== undefined));
  await query(`
    DELETE FROM location_machine WHERE location_id = ?
  `, [original_location.id]);
  await query(`
    INSERT INTO location_machine (machine_id, location_id)
    VALUES ${Array.from({length: machine_ids.length}, () => "(?," + original_location.id + ")").join(",")}
  `, machine_ids);
  const location = (await query<any[]>(`
    SELECT * FROM locations WHERE id = ?
  `, [original_location.id]))[0];
  const machines = await query<any[]>(`
    SELECT location_machine.id as id, machines.id as machine_id, type, price, weekend_price_multiplier, size_in_kg, running_time
    FROM machines INNER JOIN location_machine ON location_machine.machine_id = machines.id
    WHERE location_machine.location_id = ?
  `, [original_location.id]);
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

router.delete("/location/:slug", async (req, res) => {
  const {slug} = req.params;
  await query(`
    UPDATE locations SET deleted_at = NOW() WHERE slug = ?
  `, [slug]);
  res.status(200).json({ success: true });
});

router.get("/machines", async (req, res) => {
  const machines = await query(`
    SELECT id, type, size_in_kg FROM machines;
  `);
  res.status(200).json(machines);
});

router.get("/subscriptions", async (req, res) => {
  const subscriptions = await query(`
    SELECT id, nickname, email, display_email, created_at, updated_at FROM subscriptions;
  `);
  res.status(200).json(subscriptions);
});

router.delete("/subscriptions/:id", async (req, res) => {
  const {id} = req.params;
  await query(`
    DELETE FROM subscriptions WHERE id = ?
  `, [id]);
  res.status(200).json({ success: true });
});

export default router;