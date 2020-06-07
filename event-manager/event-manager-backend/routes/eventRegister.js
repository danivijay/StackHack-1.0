const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const { addEventRegister } = require("../controllers/eventRegister");

router.post("/register", addEventRegister);

module.exports = router;
