import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createTransactionSchema, updateTransactionSchema } from './transaction.schema';
import * as txController from './transaction.controller';

const router = Router();

router.use(authenticate);

router.get('/categories/list', txController.getCategories);
router.get('/', txController.getTransactions);
router.get('/:id', txController.getTransactionById);
router.post('/', authorize('analyst', 'admin'), validate(createTransactionSchema), txController.createTransaction);
router.patch('/:id', authorize('analyst', 'admin'), validate(updateTransactionSchema), txController.updateTransaction);
router.delete('/:id', authorize('admin'), txController.softDeleteTransaction);

export default router;
