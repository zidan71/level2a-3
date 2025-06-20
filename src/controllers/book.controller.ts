import { Request, Response } from "express";
import { Book } from "../models/book.model";


export const createBook = async(req:Request,res:Response)  : Promise<void> => {
    try{
        const book = await Book.create(req.body);
        res.status(201).json({
            success:true,
            message:"Book Created Successfully",
            data:book
        });
    }
    catch(err) {
        res.status(400).json({
            success:false,
            message:"Validation failed",
            error:err
        })
    }
}

export const getAllBooks = async(req:Request,res:Response) => {
    try{
        const {filter,sortBy = 'createdAt',sort = 'desc',limit = '10'} = req.query

        const query:any ={};
        if(filter){
            query.genre = filter;
        }

        const books = await Book.find(query)
        .sort({[sortBy as string]: sort === 'asc' ? 1 : -1})
        .limit(parseInt(limit as string));

        res.status(200).json({
            success:true,
            message:"Books retrieved Successfully",
            data:books
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to fetch books",
            error:err
        });
    }
};

export const getBookById = async(req:Request,res:Response): Promise<void>  =>  {
    try{
        const {bookId} = req.params;
        const book = await Book.findById(bookId);

        if(!book) {
             res.status(404).json({
                success:false,
                message:"Book not found",
                error:`No book with Id: ${bookId}`
            })
            return
        }

        res.status(200).json({
            success:true,
            message:"Book retrieved successfully",
            data:book
        })
    }
    catch(err) {
        res.status(500).json({
            success:false,
            message:"Failed to retrieve book",
            error:err
        })
    }
}

export const updateBook = async(req:Request,res:Response):Promise<void>  =>  {
    try{
        const {bookId} = req.params;
        const updatedData = req.body;

        const updatedBook = await Book.findByIdAndUpdate(bookId,updatedData,{
            new:true,
            runValidators:true
        });

        if(!updatedBook){
             res.status(404).json({
                success:false,
                message:"book not found",
                error:`No book with id:${bookId}`
            })
            return
        }

        res.status(200).json({
            success:true,
            message:"Book updated Successfully",
            data:updateBook
        })
    }
    catch(err) {
        res.status(500).json({
            success:false,
            message:"Failed to update book",
            err,
        })
    }
}
export const deleteBook = async(req:Request,res:Response) :Promise<void>  => {
    try{
        const {bookId} = req.params;

        const deletedBook = await Book.findByIdAndDelete(bookId);


         if (!deletedBook) {
       res.status(404).json({
        success: false,
        message: 'Book not found',
        error: `No book with ID: ${bookId}`
      });
      return
    }

        res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });


    }
    catch(err) {
        res.status(500).json({
            success:false,
            message:"Failed to delete book",
            err,
        })
    }
}