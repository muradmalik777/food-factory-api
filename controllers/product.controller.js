const ProductsModel = require("../models/product.model");
const ErrorCodes = require("../utils/errorCodes");

exports.get = (req, res) => {
  ProductsModel.findById(req.params.machineId)
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
  const skip = pageSize * (page - 1);
  ProductsModel.count()
    .then((count) => {
      ProductsModel.find()
        .limit(pageSize)
        .skip(skip)
        .exec()
        .then((products) => {
          res.status(200).json({ totalCount: count, list: products });
        })
        .catch((e) => {
          res.status(400).json(e);
        });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.create = (req, res) => {
  ProductsModel.createProducts(req.body.products)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.deleteMachines = (req, res) => {
  ProductsModel.deleteProducts(req.body.products)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.delete = (req, res) => {
  ProductsModel.deleteProduct(req.params.machineId)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.update = (req, res) => {
  req.body.data.updatedAt = new Date().getTime();
  ProductsModel.updateProduct(req.params.machineId, req.body.data)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};
