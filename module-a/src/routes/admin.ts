import express from 'express';
import { expect, field } from '../lib/validate';
import { query } from '../lib/db';
import { InvalidCredsError, ValidationError } from '../lib/error';
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
  if (!user) // TODO: || !await bcrypt.compare(password, user.password))
    throw new InvalidCredsError();
  if (!user.token) {
    const token = crypto.randomBytes(32).toString('hex');
    query("UPDATE admins SET token = ? WHERE username = ?", [token, username]);
    user.token = token;
  }
  res.status(200).json({
    success: true,
    token: user.token,
    admin: ["id", "name", "username", "last_login_at", "created_at", "updated_at"]
      .reduce((p,v) => ({...p,[v]:user[v]}),{})
  });
});

router.use(adminAuth);

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

export default router;