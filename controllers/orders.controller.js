const OrdersModel = require("../models/orders.model");
const ErrorCodes = require("../utils/errorCodes");

exports.get = (req, res) => {
  OrdersModel.findById(req.params.orderId)
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
  OrdersModel.findAll(req)
    .then((orders) => {
      res.status(200).json(orders);
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
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.deleteOrders = (req, res) => {
  OrdersModel.deleteOrders(req.body.orders)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.delete = (req, res) => {
  OrdersModel.deleteOrder(req.params.orderId)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.update = (req, res) => {
  (req.body.data.updatedAt = new Date().getTime()),
    OrdersModel.updateOrder(req.params.orderId, req.body.data)
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((e) => {
        res.status(500).json(ErrorCodes.generateError(1));
      });
};
