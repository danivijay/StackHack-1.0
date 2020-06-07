const Todo = require("../models/EventRegister");

exports.addEventRegister = async (req, res, next) => {
  try {
    const { full_name, mobile, email, registration_type, id_url } = req.body;
    const number_of_tickets =
      registration_type === "Self" ? 1 : req.body.number_of_tickets;
    const event = await Todo.create({
      full_name: full_name,
      mobile: mobile,
      email: email,
      registration_type: registration_type,
      number_of_tickets: number_of_tickets,
      id_url: id_url,
      registration_date: new Date(),
    });
    res.status(201).json({
      success: true,
      data: {
        id: event.id,
        number_of_tickets: event.number_of_tickets,
      },
    });
  } catch (error) {
    console.log(`Error on registration ${error.message}`.red);
    res.status(500).json({
      success: false,
      errors: ["Unable to register", error.message],
    });
  }
};
