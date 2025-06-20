import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ytuhl.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => console.error(err));
