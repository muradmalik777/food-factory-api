const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  deliveryDate: {
    type: Number,
    default: 0,
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
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "",
  },
  truckTemperature: {
    type: String,
    default: "",
  },
  truckCondition: {
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
    type: Number,
    default: 0,
  },
  totalIncVAT: {
    type: Number,
    default: 0,
  },
  truckTemperature: {
    type: String,
    default: "",
  },
  truckCondition: {
    type: String,
    default: "",
  },
  dayCodeSticker: {
    type: String,
    default: "",
  },
  vatNo: {
    type: String,
    default: "",
  },
  exemptionNo: {
    type: String,
    default: "",
  },
  totalPurchaseOrderValue: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
    default: "",
  },
  orderData: {
    type: Array,
    default: [],
  },
  companyInfo: {
    type: Array,
    default: [],
  },
  fulfilled: {
    type: Boolean,
    default: false,
  },
  week: {
    type: Number,
    default: 0,
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

const OrdersModel = mongoose.model("orders", OrdersSchema);

exports.createOrders = (data) => {
  return OrdersModel.insertMany(data);
};

exports.deleteOrders = (data) => {
  return OrdersModel.deleteMany({ _id: { $in: data } });
};

exports.deleteOrder = (orderId) => {
  return OrdersModel.findByIdAndDelete(orderId);
};

exports.updateOrder = (orderId, data) => {
  return OrdersModel.findByIdAndUpdate(orderId, data);
};

exports.find = (query = {}) => {
  return OrdersModel.find(query);
};

exports.findById = (OrderId) => {
  return OrdersModel.findById(OrderId);
};

exports.count = () => {
  return OrdersModel.countDocuments();
};
