const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoItemSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    label: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoItem", TodoItemSchema);
