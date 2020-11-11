const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  req.body.tokenValidUntil = new Date().getTime() + 3 * 60 * 60 * 1000;
  const token = jwt.sign(req.body, process.env.JWT_SECRET);
  res.status(200).send({ accessToken: token, userId: req.body.userId });
};
