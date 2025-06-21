# 📚 Library Management API

A RESTful API built using **Express**, **TypeScript**, and **MongoDB** to manage books and borrowing functionality.


## 🚀 Features

- 🔁 Create, Read, Update, Delete (CRUD) for books
- 📥 Borrow books with copy validation and availability handling
- 📊 Get aggregated summary of borrowed books
- ✅ Robust validation and error responses
- ⚙️ Clean architecture using controllers, models, and routes
- ⛓️ Mongoose pre and post middleware for logic hooks

---

## 🧑‍💻 Technologies Used

- **Backend:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (with Mongoose ODM)
- **Other Tools:** CORS, dotenv, ts-node

---

## 🚀 Setup Instructions (Run Locally)

Follow these steps to run the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/zidan71/level2a-3

Install Dependencies
npm install

npm run dev

Build TypeScript code:
npm run build

Run compiled code:
npm start

📚 Library Management API (Simple Summary)
In this API project, you can manage books in a library. You can:

✅ Step 1: Create a Book
You can add (POST) a new book.

It includes title, author, genre, ISBN, description, and number of copies.

✅ Step 2: Get All Books
You can get (GET) all books from the database.

You can also filter by genre, sort by date, and limit the number of results.

✅ Step 3: Get a Single Book
You can get (GET) a specific book by its ID.

Useful to view details of one book.

✅ Step 4: Update a Book
You can update (PUT) the details of a book using its ID.

For example, change the number of copies or update the description.

✅ Step 5: Delete a Book
You can delete (DELETE) a book using its ID.

This will remove the book permanently from the library database.

✅ Step 6: Borrow a Book
You can borrow (POST) a book by giving:

The book ID

Quantity (how many copies to borrow)

Due date

The system checks if copies are available and updates them.

If all copies are borrowed, the book becomes unavailable.

✅ Step 7: Borrowed Books Summary
You can get (GET) a report showing:

Each borrowed book’s title and ISBN

Total quantity borrowed

This is done using MongoDB aggregation.

