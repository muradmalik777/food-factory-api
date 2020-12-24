const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
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
  v2: {
    type: String,
    default: "",
  },
  pieces: {
    type: Number,
    default: 0,
  },
  portion: {
    type: Number,
    default: 0,
  },
  preparationOfRecipeBy: {
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

exports.create = (data) => {
  return RecipeModel.create(data);
};

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
