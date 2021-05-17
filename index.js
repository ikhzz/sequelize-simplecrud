require("dotenv").config({
  path: '.env.development'
});

const express = require("express");
const app = express();
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 3000

// Import routes
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const colRoutes = require("./routes/colRoutes.js");
const itemRoutes = require("./routes/itemRoutes.js");

//Set body parser for HTTP post operation
app.use(express.json()); // support json encoded bodies
app.use(
  express.urlencoded({
    extended: false,
  })
); // support encoded bodies
app.use(fileUpload());
// set static assets to public directory (usually for images, videos, and other files)
// app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/auth", userRoutes);
app.use("/col", colRoutes);
app.use("/item", itemRoutes);

if(process.env.NODE_ENV !== "test") {
  // Server running
  app.listen(PORT, () => console.log("server running on port 3000"));
}

module.exports = app


