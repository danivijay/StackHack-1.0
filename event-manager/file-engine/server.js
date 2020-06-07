const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
// const connectDB = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const rimraf = require("rimraf");

// require("dotenv").config({ path: "./config/config.env" });

// connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.post("/upload", function (req, res) {
  const { fileProject = "general", fileUniqId = null } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const fileFolder = `${__dirname}/public/${fileProject}`;
  if (!fs.existsSync(fileFolder)) {
    fs.mkdirSync(fileFolder);
  }

  // The name of the input field (i.e. "receivedFile") is used to retrieve the uploaded file
  let receivedFile = req.files.fileContent;
  let fileExtension = req.files.fileContent.name.split(".").pop();

  // Use the mv() method to place the file somewhere on your server
  const newFileName = `${fileUniqId || uuidv4()}.${fileExtension}`;
  const filePath = `${fileFolder}/${newFileName}`;
  receivedFile.mv(filePath, function (err) {
    if (err) return res.status(500).send(err);

    res.status(200).json({
      success: true,
      url: `/${fileProject}/${newFileName}`,
    });
  });
});

// sample query: /delete_folder?folder=<project name>
app.get("/delete_folder", (req, res) => {
  try {
    const { folder } = req.query;
    rimraf.sync(`${__dirname}/public/${folder}`);
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});

app.listen(PORT, console.log(`Server Running on port ${PORT}`.yellow.bold));
