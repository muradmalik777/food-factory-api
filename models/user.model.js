const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("users", UserSchema);

exports.createUser = (data) => {
  const user = new UserModel(data);
  return user.save();
};

exports.findAll = () => {
  return UserModel.find();
};
