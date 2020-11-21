const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "storeKeeper",
  },
  role: {
    type: String,
    default: "storeKeeper",
  },
  role: {
    type: String,
    default: "storeKeeper",
  },
  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },
  updatedAt: {
    type: Number,
    default: null,
  },
  deletedAt: {
    type: Number,
    default: null,
  },
});

const UserModel = mongoose.model("users", UserSchema);

exports.createUser = (data) => {
  return UserModel.create(data);
};

exports.findAll = () => {
  return UserModel.find();
};

exports.findByEmail = (email) => {
  return UserModel.findOne({ email: email })
    .exec()
    .then((user) => {
      return user;
    })
    .catch(() => {
      return null;
    });
};

exports.findById = (userId) => {
  return UserModel.findOne({ _id: userId })
    .exec()
    .then((user) => {
      return user;
    })
    .catch(() => {
      return null;
    });
};

exports.updateUser = (userId, data) => {
  return UserModel.findByIdAndUpdate(userId, data);
};
