import userRouter from './users.route.js';
import { Router } from 'express';

const router = Router();
router.use('/users', userRouter);

export default router;