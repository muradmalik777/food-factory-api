const RecipeModel = require("../models/recipe.model");
const ErrorCodes = require("../utils/errorCodes");

exports.get = (req, res) => {
  RecipeModel.findById(req.params.recipeId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json(ErrorCodes.generateError(29));
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.getAll = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const skip = pageSize * page;
  RecipeModel.count()
    .then((count) => {
      RecipeModel.find()
        .limit(pageSize)
        .skip(skip)
        .exec()
        .then((recipies) => {
          res.status(200).json({ totalCount: count, list: recipies });
        })
        .catch((e) => {
          res.status(400).json(e);
        });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.createRecipies = (req, res) => {
  RecipeModel.createRecipies(req.body.recipies)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.deleteRecipies = (req, res) => {
  RecipeModel.deleteRecipies(req.body.recipies)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.delete = (req, res) => {
  RecipeModel.deleteRecipe(req.params.recipeId)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.update = (req, res) => {
  req.body.data.updatedAt = new Date().getTime();
  RecipeModel.updateRecipe(req.params.recipeId, req.body.data)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};
