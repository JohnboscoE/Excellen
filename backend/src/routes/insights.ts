import { Router } from 'express';
import { generateInsights } from '../controllers/insightsController';

const router = Router();
router.post('/generate', generateInsights);

export default router;