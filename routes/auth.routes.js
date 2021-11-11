const bcrypt = require("bcrypt");
const { body } = require("express-validator");

const { UserModel } = require("../models");
const { generateToken } = require("../utils/generateToken");
const { validateToken, handleErrors } = require("../middlewares/");

// Este router esta ya montado en /useres en server/app.js
const router = require("express").Router();

/*

    /api/auth

*/

router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  handleErrors,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });

      // const invalidLogin = () => {
      //   return res
      //     .status(404)
      //     .json({ ok: false, msg: "invalid email or password" });
      // };

      if (!user) {
        return res
          .status(404)
          .json({ ok: false, msg: "invalid email or password" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const token = generateToken({
          uid: user.id,
          role: user.role,
        });

        delete user.password;

        return res.json({ ok: true, user: user, token });
      } else {
        return res.status(404).json({
          ok: false,
          msg: "invalid email or password",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/validate", validateToken, async (req, res) => {
  const { uid } = req.payload;

  try {
    const user = await UserModel.findOne({ _id: uid });

    return res.json({
      ok: true,
      msg: "validado correctamente",
      user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
