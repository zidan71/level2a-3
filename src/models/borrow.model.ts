import { model, Schema } from "mongoose";

const borrow = new Schema({
    book:{
        type:Schema.Types.ObjectId,
        ref:"Book",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:[1,"Quantity must be at least 1"],
    },
    dueDate: {
        type:Date,
        required:true,
    },
},{
    timestamps:true
})

export default model("Borrow",borrow)