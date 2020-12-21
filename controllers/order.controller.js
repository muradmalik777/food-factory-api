const OrderModel = require("../models/order.model");
const ErrorCodes = require("../utils/errorCodes");
const moment = require("moment");

exports.get = (req, res) => {
  OrderModel.findById(req.params.orderId)
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
  const week = req.query.week ? parseInt(req.query.week) : 0;
  const skip = pageSize * page;
  OrderModel.count()
    .then((count) => {
      OrderModel.find({ week: week })
        .limit(pageSize)
        .skip(skip)
        .exec()
        .then((orders) => {
          res.status(200).json({ totalCount: count, list: orders });
        })
        .catch((e) => {
          res.status(400).json(e);
        });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.createOrders = (req, res) => {
  const purchaseOrders = req.body.purchaseOrders;
  purchaseOrders.forEach((item) => {
    item.week = moment(new Date(item.date)).week();
  });
  OrderModel.createOrders(purchaseOrders)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.deleteOrders = (req, res) => {
  OrderModel.deleteOrders(req.body.orders)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.delete = (req, res) => {
  OrderModel.deleteOrder(req.params.orderId)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.update = (req, res) => {
  req.body.data.updatedAt = new Date().getTime();
  OrderModel.updateOrder(req.params.orderId, req.body.data)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};
