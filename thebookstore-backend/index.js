const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

// Import the user routes
const User = require("./routes/user");

// Import the book routes
const Books = require("./routes/book");

// Import the favourite routes
const Favourite = require("./routes/favourite");

// Import the cart routes
const Cart = require("./routes/cart");

// Import the order routes
const Order = require("./routes/order");

// Use JSON middleware
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Use the imported routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});