const OrdersModel = require("../models/orders.model");
const ErrorCodes = require("../utils/errorCodes");
const moment = require("moment");

exports.purchaseOrdersWeeklystats = (req, res) => {
  OrdersModel.find({ week: req.query.week })
    .then((orders) => {
      const data = prepareOrderWeeklyStats(req.query.week, orders);
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

const prepareOrderWeeklyStats = (weekNumber, orders) => {
  const response = {
    fulfilledCount: 0,
    unFulfilledCount: 0,
    fulfilledValue: 0,
    unFulfilledValue: 0,
    totalEarning: 0,
    weeklyStats: [],
  };
  orders.forEach((item) => {
    response.totalEarning += parseFloat(item.totalPurchaseOrderValue);
    if (item.fulfilled) {
      response.fulfilledCount += 1;
      response.fulfilledValue += parseFloat(item.totalPurchaseOrderValue);
    } else {
      response.unFulfilledCount += 1;
      response.unFulfilledValue += parseFloat(item.totalPurchaseOrderValue);
    }
  });

  const weekStart = moment("2020")
    .add(weekNumber - 1, "weeks")
    .startOf("week");

  for (let i = 0; i < 7; i++) {
    const date = weekStart.add(1, "day");
    const day = new Date(date).getDate();
    const obj = {
      date: date.format("DD MM YYYY"),
      earning: 0,
    };
    orders.forEach((item) => {
      const itemDay = new Date(item.deliveryDate).getDate();
      if (itemDay === day) {
        obj.earning += parseFloat(item.totalPurchaseOrderValue);
      }
    });
    response.weeklyStats.push(obj);
  }
  return response;
};
