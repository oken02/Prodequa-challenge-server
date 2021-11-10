const { Schema, model } = require("mongoose");

const formSchema = new Schema({
  name: String,
  size: String,
  fullName: String,
  reason: String,
  position: String,
  need: String,
  phone: Number,
  message: String,
  email: String,
});

const Form = model("Form", formSchema);

module.exports = Form;