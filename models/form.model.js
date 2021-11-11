const { Schema, model } = require("mongoose");

const formSchema = new Schema({
  fullName: { type: String, required: true },
  reason: { type: String, required: true },
  position: { type: String, required: true },
  need: { type: String, required: true },
  phone: { type: Number, required: true },
  message: { type: String, required: true },
  email: { type: String, required: true },
});

const Form = model("Form", formSchema);

module.exports = Form;
