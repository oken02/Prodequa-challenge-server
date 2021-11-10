const router = require("express").Router();

const FormRouter = require("./forms.routes");

router.use("/forms", FormRouter);

module.exports = router;
