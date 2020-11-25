const OrderModel = require("../models/order.model");
const ErrorCodes = require("../utils/errorCodes");
const helpers = require("../utils/helpers");

exports.purchaseOrdersWeeklystats = (req, res) => {
  OrderModel.find({ week: req.query.week })
    .then((orders) => {
      const data = helpers.prepareOrderWeeklyStats(req.query.week, orders);
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};
