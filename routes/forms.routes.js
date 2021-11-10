const { FormModel } = require("../models");
const { body, validationResult } = require("express-validator");
const router = require("express").Router();

// router.get("/",(req,res)=>{
//     res.json()
// })

router.get("/", async (req, res) => {
  const forms = await FormModel.find();
  res.json(forms);
});

router.get("/:id", async (req, res) => {
  const form = await FormModel.findOne({ _id: req.params.id });
  res.json(form);
});

// {
//   fullName: "",
//   reason: "",
//   position: "",
//   need: "",
//   phone: "",
//   message: "",
//   email: "",
// }
router.post(
  "/",
  body("fullName").notEmpty(),
  body("reason").notEmpty(),
  body("position").notEmpty(),
  body("need").notEmpty(),
  body("phone").isNumeric(),
  body("message").notEmpty(),
  body("email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req;
    const form = await FormModel.create(body);
    res.json(form);
  }
);

module.exports = router;
