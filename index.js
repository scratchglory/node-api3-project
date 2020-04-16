const express = require("express");
const userRouter = require("./users/userRouter");
const welcomeRouter = require("./users/welcomeRouter");
const postRouter = require("./posts/postRouter");
// http request logger middleware for node.js
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./middleware/logger");

// adding server
const server = express();
const port = 3330;

// adding middleware
server.use(express.json());
// cross-origin resource sharing
server.use(cors());
// server.use(morgan())
// Error Middleware
server.use((error, req, res, next) => {
  res.status(500).json({ message: "ERROR MIDDLEWARE" });
});

// short == never closing the request
// long == closes and returns data
server.use(logger("long"));

// adding routers
server.use("/", welcomeRouter);
server.use("/posts", postRouter);
server.use("/users", userRouter);

// Listening
server.listen(port, () => {
  console.log(`== Server On ${port} ==`);
});
