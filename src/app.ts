import express from 'express';
import cors from "cors"

import bookRoutes from './routes/book.route';

import borrowRoutes from './routes/borrow.route'

export const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
