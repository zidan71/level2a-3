"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrow = exports.borrowBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const foundBook = yield book_model_1.Book.findById(book);
        if (!foundBook) {
            res.status(404).json({
                success: false,
                message: "BOok not found",
                error: "INvalid id"
            });
            return;
        }
        yield foundBook.decreaseCopies(quantity);
        const borrow = yield borrow_model_1.default.create({ book, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "BOok borrowed successfully",
            data: borrow,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error) {
        res.status(400).json({
            success: false,
            message: "borrowing failed",
            error: error.message || error,
        });
    }
});
exports.borrowBook = borrowBook;
const getBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: 'bookDetails'
                },
            },
            {
                $unwind: "$bookDetails"
            },
            {
                $project: {
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retreived successfully",
            data: summary
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "faild to retrieve borrow summary",
            error,
        });
    }
});
exports.getBorrow = getBorrow;
