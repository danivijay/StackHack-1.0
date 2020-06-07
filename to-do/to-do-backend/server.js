const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");

require("dotenv").config({ path: "./config/config.env" });

connectDB();

const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/todo", todoRoutes);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
