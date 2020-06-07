const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventRegSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true },
    registration_type: { type: String, required: true },
    number_of_tickets: { type: Number, required: true },
    id_url: { type: String, required: true },
    registration_date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventRegister", EventRegSchema);
