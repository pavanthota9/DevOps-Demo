import { Router } from 'express';
import db from '../db/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const items = await db.list();
  res.json(items);
});

router.post('/', async (req, res) => {
  const { title, done } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required string' });
  }
  const item = await db.create({ title, done: Boolean(done) });
  res.status(201).json(item);
});

export default router;
