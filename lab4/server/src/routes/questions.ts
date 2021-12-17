import { Router } from 'express';
import QUESTIONS from '../data/questions';

const router = Router();

/**
 * Returns a list of all questions
 */
router.get('/', async (req, res) => {
  const questions = QUESTIONS.map(({ answerIndex, ...rest }) => rest);
  return res.status(200).send({ questions });
});

/**
 * Check if a seleced answer is correct for a given question
 */
router.post('/:questionId', async (req, res) => {
  const selection = req.body.selection as string;
  const { questionId } = req.params;

  // Check if option is correct
  const question = QUESTIONS.find(({ id }) => id === questionId);
  const index = question.options.indexOf(selection);
  if (index === question.answerIndex) {
    return res.status(200).send({ isCorrect: true });
  }

  return res.status(200).send({ isCorrect: false });
});

/**
 * Check all questions and determine score
 */
router.post('/', async (req, res) => {
  const selections = req.body.selections as string[];

  const score = QUESTIONS.reduce((prev, { id, answerIndex, options }) => {
    const selection = selections[id];
    const index = options.indexOf(selection);
    if (index === answerIndex) {
      return prev + 1;
    }
    return prev;
  }, 0);

  return res.status(200).send({ score });
});

export default router;
