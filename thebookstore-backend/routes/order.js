const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Book = require("../models/book");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Place the order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id
            });

            const orderDataFromDb = await newOrder.save();

            // saving the order
            await User.findByIdAndUpdate(id, {
                $push: {
                    orders: orderDataFromDb._id
                },
            });

            // clearing the cart
            await User.findByIdAndUpdate(id, {
                $pull: {
                    cart: orderData._id
                },
            });
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error detected"
        });
    }
});

// Get the user's order history
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error detected"
        });
    }
});

// Get every user's orders --admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({
            path: "book",
        }).populate({
            path: "user",
        }).sort({
            createdAt: -1
        });

        return res.json({
            status: "Success",
            orders: userData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error detected"
        });
    }
});

// update order's status
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        await Order.findByIdAndUpdate(id, {
            status: req.body.status
        });

        return res.json({
            status: "Success",
            message: "Status updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error detected"
        });
    }
});

module.exports = router;