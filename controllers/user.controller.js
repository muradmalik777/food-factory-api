const UserModel = require("../models/user.model");

exports.get = (req, res) => {
  UserModel.findbyId(req.query.userId)
    .then((data) => {
      res.status(200).json(data);
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
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return next();
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};
