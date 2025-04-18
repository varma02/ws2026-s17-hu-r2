import express from 'express';
import { InvalidTokenError } from './error';
import { query } from './db';

export const adminAuth: express.RequestHandler = async (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "");
  if (!token) throw new InvalidTokenError();
  const result = await query("SELECT id FROM admins WHERE token = ?", [token]);
  if (result && (result as any[]).length) next();
  else throw new InvalidTokenError();
}