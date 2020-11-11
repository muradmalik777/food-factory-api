const UserModel = require("../models/user.model");
const ErrorCodes = require("../utils/errorCodes");

exports.get = (req, res) => {
  UserModel.findById(req.params.userId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json(ErrorCodes.generateError(23));
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.create = (req, res, next) => {
  UserModel.createUser(req.body)
    .then((user) => {
      req.body = {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department,
      };
      return next();
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};
