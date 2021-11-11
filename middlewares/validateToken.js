const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const [, reqToken] = (req.get("Authorization") || "").split(" ");

  //   const badToken = () => {
  //     return res.status(401).json({ msg: "token missing or invalid" });
  //   };

  if (!reqToken) {
    return res.status(401).json({ msg: "token missing or invalid" });
  }

  jwt.verify(reqToken, "SECRET", (err, payload) => {
    if (err) return res.status(401).json({ msg: "token missing or invalid" });
    req.payload = payload;
    next();
  });
};

module.exports = validateToken;
