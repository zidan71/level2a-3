import express from 'express'
import { borrowBook, getBorrow } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/',borrowBook);
router.get('/',getBorrow);

export default router