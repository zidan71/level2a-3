import { Request, Response } from "express";
import { Book } from "../models/book.model";


export const createBook = async(req:Request,res:Response) => {
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