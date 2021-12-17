import { Router } from 'express';
import questions from './questions';

const router = Router();

router.use('/questions', questions);

export default router;
