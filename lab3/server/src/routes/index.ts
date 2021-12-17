import { Router } from 'express';

import authRoutes from './auth';
import pollsRoutes from './polls';
import requireAuth from '../middleware/requireAuth';
import prisma from '../lib/prisma';
const router = Router();

router.get('/whoami', requireAuth, async (req, res, next) => {
  const id = res.locals.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
});

router.use('/polls', pollsRoutes);
router.use('/auth', authRoutes);

export default router;
