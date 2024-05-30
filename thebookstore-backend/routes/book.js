// These routes only accessible to authenticated users.
// add book, update, and delete

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {

        const { id } = req.headers;
        const user = await User.findById(id);

        if (user.role !== "admin") {
            return res.status(400).json({
                message: "Unauthorized"
            });
        }

        // create book
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc,
            price: req.body.price,
            category: req.body.category,
        });

        await book.save();
        res.status(200).json({
            message: "Book added successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// update book --admin
router.put("/update-book", authenticateToken, async (req, res) => {
    try {

        // Extract the book ID from the request headers
        const { bookid } = req.headers;
        
        // Update the book's details with the data provided in the request body
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc,
            price: req.body.price,
            category: req.body.category,
        });

        // If successfully update a book, return a success message with the updated book details
        return res.status(200).json({
            message: "Book updated successfully"
        });
    }
    catch (error) {
        // Catch and return any server errors
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

// delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {

        // Extract the book ID from the request headers
        const { bookid } = req.headers;

        // Attempt to find and delete the book by its ID
        await Book.findByIdAndDelete(bookid);

        // If successfully deleted, return a success message
        return res.status(200).json({
            message: "Book deleted successfully"
        });
    }
    catch (error) {
        // Catch and return any server errors
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

// get all books
router.get("/get-all-books", async (req, res) => {
    try {

        const books = await Book.find().sort({ createdAt: -1 });
        
        return res.json({
            status: "Success",
            data: books,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});

// get recently added books

router.get("/get-recent-books", async (req, res) => {
    try {

        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        
        return res.json({
            status: "Success",
            data: books,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});

// get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const book = await Book.findById(id);
        
        return res.json({
            status: "Success",
            data: book,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;