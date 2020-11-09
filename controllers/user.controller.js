const UserModel = require("../models/user.model");

exports.getAll = (req, res) => {
  UserModel.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.create = (req, res) => {
  console.log(req.body);
  UserModel.createUser(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};
