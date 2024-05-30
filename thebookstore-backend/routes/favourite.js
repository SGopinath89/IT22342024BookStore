const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book to favorites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);

        const isBookFavorite = userData.favourites.includes(bookid);

        if (isBookFavorite) {
            return res.status(200).json({
                message: "Book is already in favorites"
            });
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({
            message: "Book added to favorites"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// remove book from favorites
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);

        const isBookFavorite = userData.favourites.includes(bookid);

        if (isBookFavorite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }

        return res.status(200).json({
            message: "Book removed from favorites"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// get user's favourites list
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id).populate("favourites");

        const favouriteBooks = userData.favourites;

        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;