const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  deliveryDate: {
    type: String,
    default: "",
  },
  purchaseOrderNumber: {
    type: String,
    default: "",
  },
  deliveryTo: {
    type: String,
    default: "",
  },
  ccp1: {
    type: String,
    default: "",
  },
  supplier: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  fax: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  ourRef: {
    type: String,
    default: "",
  },
  orderRef: {
    type: String,
    default: "",
  },
  ac: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  currency: {
    type: String,
    default: "",
  },
  truckTemperature: {
    type: String,
    default: "",
  },
  truckTonditions: {
    type: String,
    default: "",
  },
  attn: {
    type: String,
    default: "",
  },
  acceptedBy: {
    type: String,
    default: "",
  },
  paymentTerms: {
    type: String,
    default: "",
  },
  deliveryTime: {
    type: String,
    default: "",
  },
  remarks: {
    type: String,
    default: "",
  },
  criticalLimits: {
    type: String,
    default: "",
  },
  deliveryTill: {
    type: String,
    default: "",
  },
  totalVAT: {
    type: String,
    default: "",
  },
  totalIncVAT: {
    type: String,
    default: "",
  },
  totalPurchaseOrderValue: {
    type: String,
    default: "",
  },
  note: {
    type: String,
    default: "",
  },
  orderData: {
    type: Array,
    default: [],
  },
  fulfilledStatus: {
    type: String,
    default: "",
  },
});

const OrdersModel = mongoose.model("orders", OrdersSchema);

exports.createOrders = (data) => {
  return OrdersModel.insertMany(data);
};

exports.findAll = (req) => {
  return OrdersModel.find();
};

exports.findById = (OrderId) => {
  return OrdersModel.findOne({ _id: OrderId })
    .exec()
    .then((order) => {
      return order;
    })
    .catch(() => {
      return null;
    });
};
