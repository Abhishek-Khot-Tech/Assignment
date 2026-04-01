import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import * as dashboardController from './dashboard.controller';

const router = Router();

router.use(authenticate);

router.get('/summary', dashboardController.getSummary);
router.get('/category-breakdown', dashboardController.getCategoryBreakdown);
router.get('/monthly-trends', dashboardController.getMonthlyTrends);
router.get('/recent-activity', dashboardController.getRecentActivity);
router.get('/weekly-summary', dashboardController.getWeeklySummary);

export default router;
