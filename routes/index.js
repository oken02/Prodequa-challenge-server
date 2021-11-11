const formRouter = require("./forms.routes");
const authRouter = require("./auth.routes");

const router = require("express").Router();

router.use("/forms", formRouter);
router.use("/auth", authRouter);

module.exports = router;
