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

exports.getAll = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 25;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const skip = pageSize * page;
  UserModel.count()
    .then((count) => {
      UserModel.find()
        .limit(pageSize)
        .skip(skip)
        .exec()
        .then((users) => {
          res.status(200).json({ totalCount: count, list: users });
        })
        .catch((e) => {
          res.status(400).json(e);
        });
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

exports.addUser = (req, res) => {
  UserModel.createUser(req.body)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.update = (req, res) => {
  const data = {
    email: req.body.data.email,
    name: req.body.data.name,
    password: req.body.data.newPassword,
    updatedAt: new Date().getTime(),
  };
  UserModel.updateUser(req.params.userId, data)
    .then((doc) => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(400).json(ErrorCodes.generateError(1));
    });
};
