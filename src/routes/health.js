import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', commit: process.env.GIT_SHA || 'local-dev' });
});

export default router;
