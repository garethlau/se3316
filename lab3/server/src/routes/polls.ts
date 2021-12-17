import { Router } from 'express';
import requireAuth from '../middleware/requireAuth';
import prisma from '../lib/prisma';
const router = Router();

router.post('/:pollId/responses', async (req, res, next) => {
  const { pollId } = req.params;
  const selected = req.body.selected as string[];
  const name = req.body.name as string;

  try {
    const poll = await prisma.response.create({
      data: {
        author: name,
        Poll: {
          connect: {
            id: pollId,
          },
        },
        timeslots: {
          connect: selected.map((id) => ({ id })),
        },
      },
      include: {
        timeslots: true,
      },
    });
    return res.status(200).send({ poll });
  } catch (error) {
    next(error);
  }
});

/**
 * Get a specific poll by id
 */
router.get('/:pollId', async (req, res, next) => {
  const { pollId } = req.params;
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        responses: {
          include: {
            timeslots: true,
          },
        },
        timeslots: true,
        creator: true,
      },
    });
    return res.status(200).send({ poll });
  } catch (error) {
    next(error);
  }
});

/**
 * Create a poll
 */
router.post('/', requireAuth, async (req, res, next) => {
  const { date, timeslots } = req.body;
  const id = parseInt(res.locals.id, 10);

  try {
    const poll = await prisma.poll.create({
      data: {
        date,
        timeslots: {
          create: timeslots.map(({ start, end }) => ({
            startHour: parseInt(start[0], 10),
            startMinute: parseInt(start[1], 10),
            endHour: parseInt(end[0], 10),
            endMinute: parseInt(end[1], 10),
          })),
        },
        creator: {
          connect: {
            id: id,
          },
        },
      },
    });
    return res.status(200).send({ poll });
  } catch (error) {
    next(error);
  }
});

export default router;
