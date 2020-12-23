const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const RosterSchema = new Schema({
  day: {
    type: Number,
    default: 1,
  },
  week: {
    type: Number,
    default: 0,
  },
  items: {
    type: Array,
    default: [],
  },
  department: {
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

exports.findOne = (query = {}) => {
  return RosterModel.findOne(query);
};

exports.count = (query = {}) => {
  return RosterModel.countDocuments(query);
};
