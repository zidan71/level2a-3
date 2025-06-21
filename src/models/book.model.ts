import { Schema, model, Document } from "mongoose";

export interface BookDocument extends Document {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  decreaseCopies(quantity: number): Promise<void>;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

bookSchema.methods.decreaseCopies = async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error("Not enough copies available");
  }
  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }
  await this.save();
};

bookSchema.post("save", function (doc) {
  console.log(`📚 Book titled "${doc.title}" has been saved successfully!`);
});

export const Book = model<BookDocument>('Book', bookSchema);
