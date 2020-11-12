const OrdersModel = require("../models/orders.model");
const ErrorCodes = require("../utils/errorCodes");

exports.get = (req, res) => {
  OrdersModel.findById(req.params.orderId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json(ErrorCodes.generateError(23));
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.getAll = (req, res) => {
  OrdersModel.findAll(req)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json(ErrorCodes.generateError(23));
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.create = (req, res) => {
  OrdersModel.createOrders(req.body.purchaseOrders)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(400).json(ErrorCodes.generateError(1));
    });
};
