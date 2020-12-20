const OrderModel = require("../models/order.model");
const RosterModel = require("../models/roster.model");
const ProductModel = require("../models/product.model");
const ErrorCodes = require("../utils/errorCodes");
const helpers = require("../utils/helpers");
const moment = require("moment");

exports.ordersWeeklystats = (req, res) => {
  OrderModel.find({ week: req.query.week })
    .then((orders) => {
      const data = helpers.prepareOrderWeeklyStats(req.query.week, orders);
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.productsWeeklystats = (req, res) => {
  const startDate = new Date(
    moment().day("Monday").week(req.query.week).startOf("week")
  ).getTime();
  const endDate = new Date(
    moment().day("Monday").week(req.query.week).endOf("week")
  ).getTime();

  ProductModel.find({
    $and: [{ updatedAt: { $gt: startDate } }, { updatedAt: { $lte: endDate } }],
  })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.rostersWeeklystats = (req, res) => {
  RosterModel.find({ week: req.query.week })
    .then((rosters) => {
      const data = helpers.prepareRosterWeeklyStats(rosters);
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};
