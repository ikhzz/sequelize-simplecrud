if(!process.env.NODE_ENV){
  require("dotenv").config({
    path: '.env.development'
  });
} else {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
  });  
}
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload')

// Import routes
const transaksiRoutes = require("./routes/transaksiRoutes.js");
const barangRoutes = require("./routes/barangRoutes.js");
const pemasokRoutes = require("./routes/pemasokRoutes.js");
const pelangganRoutes = require("./routes/pelangganRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

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

app.use("/transaksi", transaksiRoutes); // if accessing localhost:3000/transaksi/* we will go to transaksiRoutes
app.use("/barang", barangRoutes);
app.use("/pemasok", pemasokRoutes);
app.use("/pelanggan", pelangganRoutes);
app.use("/auth", authRoutes);

if(process.env.NODE_ENV !== "test") {
  // Server running
  app.listen(3000, () => console.log("server running on port 3000"));
}

module.exports = app


