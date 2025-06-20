import { model, Schema } from "mongoose";


const book = new Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true,enum:['FICTION','NON_FICTION','SCIENCE','HISTORY','BIOGRAPHY','FANTASY']},
    isbn:{type:String,required:true,unique:true},
    description:{type:String},
    copies:{type:Number,required:true, min:0},
    available:{type:Boolean,default:true}

},{
    timestamps:true
});

export const Book = model("Book",book)