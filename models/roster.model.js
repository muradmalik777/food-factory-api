const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const RosterSchema = new Schema({
  code: {
    type: String,
    default: "",
  },
  section: {
    type: String,
    default: "",
  },
  date: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  in: {
    type: String,
    default: "",
  },
  out: {
    type: String,
    default: "",
  },
  hours: {
    type: Number,
    default: 0,
  },
  employee: {
    type: String,
    default: "",
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

const RosterModel = mongoose.model("rosters", RosterSchema);

exports.createRosters = (data) => {
  return RosterModel.insertMany(data);
};

exports.deleteRosters = (data) => {
  return RosterModel.deleteMany({ _id: { $in: data } });
};

exports.deleteRoster = (rosterId) => {
  return RosterModel.findByIdAndDelete(rosterId);
};

exports.updateRoster = (rosterId, data) => {
  return RosterModel.findByIdAndUpdate(rosterId, data);
};

exports.find = (query = {}) => {
  return RosterModel.find(query);
};

exports.findById = (rosterId) => {
  return RosterModel.findById(rosterId);
};

exports.count = () => {
  return RosterModel.countDocuments();
};
