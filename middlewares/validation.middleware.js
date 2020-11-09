const UserModel = require("../models/user.model");
const crypto = require("crypto");

exports.validateLogin = (req, res, next) => {
  if (req.body.email && req.body.password) {
    UserModel.findByEmail(req.body.email).then((user) => {
      if (user) {
        const passwordFields = user.password.split("$");
        const salt = passwordFields[0];
        const hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.password)
          .digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            userId: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          return next();
        } else {
          return res
            .status(400)
            .send({ errors: ["Invalid email or password"] });
        }
      } else {
        res.status(404).json("Missing required fields");
      }
    });
    return next();
  } else {
    res.status(400).json("missing required fields");
  }
};

exports.validateRegister = (req, res, next) => {
  if (req.body.email && req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
    return next();
  } else {
    res.status(400).json("missing required fields");
  }
};

exports.validateRole = (req, res, next) => {};

exports.validateJWT = (req, res, next) => {};

exports.createJWT = (req, res, next) => {};

const createToken = () => {};
