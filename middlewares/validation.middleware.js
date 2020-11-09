const UserModel = require("../models/user.model");
const crypto = require("crypto");

exports.validateLogin = (req, res, next) => {};

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
