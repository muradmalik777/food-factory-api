const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const RosterSchema = new Schema({
  employeeName: {
    type: String,
    default: "",
  },
  punchClockNumber: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  date: {
    type: Number,
    default: 0,
  },
  department: {
    type: String,
    default: "",
  },
  subDepartment: {
    type: String,
    default: "",
  },
  punchIn: {
    type: String,
    default: "",
  },
  punchOut: {
    type: String,
    default: "",
  },
  roster: {
    type: Number,
    default: 0,
  },
  day: {
    type: Number,
    default: 1,
  },
  week: {
    type: Number,
    default: 0,
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

exports.createRoster = (data) => {
  return RosterModel.create(data);
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

exports.count = (query = {}) => {
  return RosterModel.countDocuments(query);
};
