const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
  machineName: {
    type: String,
    default: "",
  },
  machineNumber: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  productionPerHour: {
    type: String,
    default: "",
  },
  machineOps: {
    type: String,
    default: "",
  },
  unoperationalReason: {
    type: String,
    default: "",
  },
  lastMaintenance: {
    type: Number,
    default: 0,
  },
  scheduledMaintenance: {
    type: Number,
    default: 0,
  },
  operational: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
  ],
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

const MachineModel = mongoose.model("machines", MachineSchema);

exports.createMachine = (data) => {
  return MachineModel.create(data);
};

exports.deleteMachines = (data) => {
  return MachineModel.deleteMany({ _id: { $in: data } });
};

exports.deleteMachine = (machineId) => {
  return MachineModel.findByIdAndDelete(machineId);
};

exports.updateMachine = (machineId, data) => {
  return MachineModel.findByIdAndUpdate(machineId, data);
};

exports.find = (query) => {
  return MachineModel.find(query);
};

exports.findById = (machineId) => {
  return MachineModel.findById(machineId);
};

exports.count = () => {
  return MachineModel.countDocuments();
};
