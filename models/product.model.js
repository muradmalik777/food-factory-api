const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  stockCode: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  primarySupplier: {
    type: String,
    default: "",
  },
  primarySupplierCode: {
    type: String,
    default: "",
  },
  secondarySupplier: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  currentPrice: {
    type: String,
    default: "",
  },
  date: {
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

const ProductModel = mongoose.model("products", ProductSchema);

exports.createProducts = (data) => {
  return ProductModel.insertMany(data);
};

exports.deleteProducts = (data) => {
  return ProductModel.deleteMany({ _id: { $in: data } });
};

exports.deleteProduct = (machineId) => {
  return ProductModel.findByIdAndDelete(machineId);
};

exports.updateProduct = (machineId, data) => {
  return ProductModel.findByIdAndUpdate(machineId, data);
};

exports.find = (query = {}) => {
  return ProductModel.find(query);
};

exports.findById = (productId) => {
  return ProductModel.findById(productId);
};

exports.count = () => {
  return ProductModel.countDocuments();
};
