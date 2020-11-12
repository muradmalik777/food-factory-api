const UserModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const ErrorCodes = require("../utils/errorCodes");

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
            name: user.name,
            department: user.department,
          };
          return next();
        } else {
          return res.status(400).json(ErrorCodes.generateError(20));
        }
      } else {
        return res.status(400).json(ErrorCodes.generateError(23));
      }
    });
  } else {
    res.status(400).json(ErrorCodes.generateError(24));
  }
};

exports.validateRegister = (req, res, next) => {
  if (req.body.email && req.body.password) {
    UserModel.findByEmail(req.body.email).then((user) => {
      if (user) {
        res.status(400).json(ErrorCodes.generateError(27));
      } else {
        const salt = crypto.randomBytes(16).toString("base64");
        const hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.password)
          .digest("base64");
        req.body.password = salt + "$" + hash;
        return next();
      }
    });
  } else {
    res.status(400).json(ErrorCodes.generateError(24));
  }
};

exports.validateRole = (req, res, next) => {};

exports.validateJWT = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      const authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send(ErrorCodes.generateError(26));
      } else {
        req.user = jwt.verify(authorization[1], process.env.JWT_SECRET);
        if (req.user.userId) {
          return next();
        } else {
          res.status(400).json(ErrorCodes.generateError(25));
        }
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};
