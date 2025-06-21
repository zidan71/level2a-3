import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

const PORT = 5000;

app.get('/',(req: Request,res:Response) => {
  res.send('server is running smoothly')
})






mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ytuhl.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => console.error(err));
