import { Router } from 'express';
import jobs from '../data/jobs';

const router = Router();

router.get('/', async (req, res) => {
  const city = req.query.city as string;

  const matches = [];
  for (const [key, value] of Object.entries(jobs)) {
    const { title } = value;
    if (title.toLowerCase().includes(city.toLowerCase())) {
      matches.push(value);
    }
  }

  return res.status(200).send({ jobs: matches });
});

router.get('/categories', async (req, res) => {
  const freq = new Map<string, number>();
  for (const [key, value] of Object.entries(jobs)) {
    const { categories } = value;
    categories.forEach((category) => {
      freq.set(category, freq.has(category) ? freq.get(category) + 1 : 1);
    });
  }

  const categoryFrequency = Array.from(freq.entries());

  return res.status(200).send({ categoryFrequency });
});

router.get('/categories/:category', async (req, res) => {
  const { category } = req.params;

  const matches = [];
  for (const [key, value] of Object.entries(jobs)) {
    const { categories } = value;
    if (categories.includes(category)) {
      matches.push(value);
    }
  }
  console.log(matches);

  return res.status(200).send({ jobs: matches });
});

export default router;
