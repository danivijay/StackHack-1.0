const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const {
  getItems,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo");

router.get("/", getItems);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

module.exports = router;
