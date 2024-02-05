const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
  // Bearer <token>
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.json({
        sucess: 0,
        message: "Unauthoroized",
      });
    } else {
      req.user = user;
      next();
    }
  });
};