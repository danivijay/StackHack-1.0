const TodoItem = require("../models/TodoItem");

// @desc    Get all todo
// @route   GET /api/v1/todo
// @access  Private
exports.getItems = async (req, res, next) => {
  try {
    const items = await TodoItem.find();
    res.status(200).json({
      success: true,
      count: items.length,
      data: items.map(({ _id: id, label, dueDate, status }) => ({
        id,
        label,
        dueDate,
        status,
      })),
    });
  } catch (error) {
    console.log(`Error on getting todo items: ${error.message}`.red);
    res.status(500).json({
      success: false,
      errors: ["Unable to get Todo Items", error.message],
    });
  }
};

// @desc    Add a todo
// @route   GET /api/v1/todo
// @access  Private
exports.addTodo = async (req, res, next) => {
  try {
    const { label, dueDate } = req.body;
    const item = await TodoItem.create({
      label: label,
      dueDate: dueDate,
      status: "active",
      user_id: req.user_id,
    });
    res.status(201).json({
      success: true,
      data: {
        id: item.id,
        label: item.label,
        dueDate: item.dueDate,
        status: item.status,
        user_id: item.user_id,
      },
    });
  } catch (error) {
    console.log(`Error on adding todo item ${error.message}`.red);
    res.status(500).json({
      success: false,
      errors: ["Unable to add todo item", error.message],
    });
  }
};

// @desc    Update a todo
// @route   GET /api/v1/todo/:id
// @access  Private
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await TodoItem.findById(req.params.id);
    if (!todo) {
      throw new Error("todo is not available to remove");
    }
    todo.label = req.body.label ? req.body.label : todo.label;
    todo.dueDate = req.body.dueDate ? req.body.dueDate : todo.dueDate;
    todo.status = req.body.status ? req.body.status : todo.status;
    const item = await todo.save();
    res.status(201).json({
      success: true,
      data: {
        id: item.id,
        label: item.label,
        dueDate: item.dueDate,
        status: item.status,
        user_id: item.user_id,
      },
    });
  } catch (error) {
    console.log(`Error on updating todo item ${error.message}`.red);
    res.status(500).json({
      success: false,
      errors: ["Unable to update todo item", error.message],
    });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/v1/todo/:id
// @access  Private
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await TodoItem.findById(req.params.id);
    if (!todo) {
      throw new Error("todo is not available to remove");
    }
    await todo.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(`Error on deleting todo item: ${error.message}`.red);
    res.status(500).json({
      success: false,
      errors: ["Unable to remove todo", error.message],
    });
  }
};
