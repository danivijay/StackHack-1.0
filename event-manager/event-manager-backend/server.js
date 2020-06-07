const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config({ path: "./config/config.env" });

connectDB();

const eventRegisterRoutes = require("./routes/eventRegister");
const userRoutes = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/event", eventRegisterRoutes);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
