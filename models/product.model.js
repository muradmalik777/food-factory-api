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

const ProductsModel = mongoose.model("products", ProductSchema);

exports.createProducts = (data) => {
  return ProductsModel.insertMany(data);
};

exports.deleteProducts = (data) => {
  return ProductsModel.deleteMany({ _id: { $in: data } });
};

exports.deleteProduct = (machineId) => {
  return ProductsModel.findByIdAndDelete(machineId);
};

exports.updateProduct = (machineId, data) => {
  return ProductsModel.findByIdAndUpdate(machineId, data);
};

exports.findAll = () => {
  return ProductsModel.find();
};

exports.find = (query) => {
  return ProductsModel.find(query);
};

exports.findById = (productId) => {
  return ProductsModel.findById(productId)
    .exec()
    .then((order) => {
      return order;
    })
    .catch(() => {
      return null;
    });
};
