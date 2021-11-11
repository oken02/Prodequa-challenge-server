const { FormModel } = require("../models");
const { body, validationResult } = require("express-validator");
const { validateToken, handleErrors } = require("../middlewares");
const router = require("express").Router();

router.get("/", [validateToken], async (req, res, next) => {
  try {
    const forms = await FormModel.find();
    res.json(forms);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", [validateToken], async (req, res, next) => {
  try {
    const form = await FormModel.findOne({ _id: req.params.id });
    res.json(form);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  body("fullName").notEmpty(),
  body("reason").notEmpty(),
  body("position").notEmpty(),
  body("need").notEmpty(),
  body("phone").isNumeric(),
  body("message").notEmpty(),
  body("email").isEmail(),
  handleErrors,
  async (req, res, next) => {
    try {
      const form = await FormModel.create(req.body);
      res.json(form);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
