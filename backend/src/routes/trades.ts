import { Router } from 'express';
import { getSpotTrades, getFuturesTrades, getAccountInfo, getAnalytics } from '../controllers/tradesController';

const router = Router();

router.get('/spot', getSpotTrades);
router.get('/futures', getFuturesTrades);
router.get('/account', getAccountInfo);
router.get('/analytics', getAnalytics);

export default router;