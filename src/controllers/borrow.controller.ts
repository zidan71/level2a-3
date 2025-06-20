import { Request, Response } from "express";
import { Book } from "../models/book.model";
import Borrow from "../models/borrow.model"

export const borrowBook = async(req:Request, res:Response):Promise<void>  => {
    try{
        const {book,quantity,dueDate} = req.body

        const foundBook = await Book.findById(book);

        if(!foundBook) {
             res.status(404).json({
                success: false,
                message:"BOok not found",
                error: "INvalid id"
            })
            return
        }

        await foundBook.decreaseCopies(quantity);

        const borrow = await Borrow.create({book,quantity,dueDate})

        res.status(201).json({
            success:true,
            message:"BOok borrowed successfully",
            data:borrow,
        })
    }
    catch(error:any){
        res.status  (400).json({
            success:false,
            message:"borrowing failed",
            error:error.message || error,
        })
    }
}


export const getBorrow = async(req:Request,res:Response) : Promise<void>  => {
    try{
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id:"$book",
                    totalQuantity: {$sum:"$quantity"},
                },
            },
            {
                $lookup:{ 
                    from:"books",
                    localField:"_id",
                    foreignField:"_id",
                    as:'bookDetails'
                },
            },
            {
                    $unwind:"$bookDetails"
                },
                {
                    $project: {
                        book: {
                            title:"$bookDetails.title",
                            isbn:"$bookDetails.isbn",
                        },
                        totalQuantity:1,
                    },
                },
        ]);

        res.status(200).json({
        success: true,
        message:"Borrowed books summary retreived successfully",
        data:summary
    })

    }

    catch(error) {
        res.status(500).json({
            success : false,
            message:"faild to retrieve borrow summary",
            error,
        });
    }
    
}