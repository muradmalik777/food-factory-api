const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  cookingLoss: {
    type: Object,
    default: {
      percentage: 0,
      value: 0,
    },
  },
  costPerKG: {
    type: Number,
    default: 0,
  },
  costingBy: {
    type: String,
    default: "",
  },
  date: {
    type: Number,
    default: 0,
  },
  items: {
    type: Array,
    default: [],
  },
  name: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  netYield: {
    type: Number,
    default: 0,
  },
  preparedBy: {
    type: String,
    default: "",
  },
  recipeNumber: {
    type: String,
    default: "",
  },
  section: {
    type: String,
    default: "",
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  totalYield: {
    type: Number,
    default: 0,
  },
  v2: {
    type: String,
    default: "",
  },
  yieldInPCS: {
    type: Number,
    default: 0,
  },
  yieldInKG: {
    type: Number,
    default: 0,
  },
  contract: {
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

// const defaultItemObject = {
//   stockNumber: "",
//   ingredients: "",
//   lotNumber: "",
//   useBy: "",
//   weightUnit: "",
//   weightQuantity: "",
//   constUnit: "",
//   costTotal: "",
//   perUnit: "",
// };

const RecipeModel = mongoose.model("recipies", RecipeSchema);

exports.createRecipies = (data) => {
  return RecipeModel.insertMany(data);
};

exports.deleteRecipies = (data) => {
  return RecipeModel.deleteMany({ _id: { $in: data } });
};

exports.deleteRecipe = (orderId) => {
  return RecipeModel.findByIdAndDelete(orderId);
};

exports.updateRecipe = (orderId, data) => {
  return RecipeModel.findByIdAndUpdate(orderId, data);
};

exports.find = (query = {}) => {
  return RecipeModel.find(query);
};

exports.findById = (OrderId) => {
  return RecipeModel.findById(OrderId);
};

exports.count = () => {
  return RecipeModel.countDocuments();
};
