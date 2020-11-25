const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const AuthController = require("../controllers/auth.controller");
const OrderController = require("../controllers/order.controller");
const StatsController = require("../controllers/stats.controller");
const MachineController = require("../controllers/machine.controller");
const multer = require("multer");

const upload = multer({
  dest: "./uploads",
});

// user routes
router
  .route("/user/:userId")
  .get([ValidationMiddleware.validateJWT, UserController.get]);
router
  .route("/login")
  .post([ValidationMiddleware.validateLogin, AuthController.login]);
router
  .route("/register")
  .post([
    ValidationMiddleware.validateRegister,
    UserController.create,
    AuthController.login,
  ]);
router
  .route("/user/:userId")
  .put([
    ValidationMiddleware.validateJWT,
    ValidationMiddleware.validateUserUpdate,
    UserController.update,
  ]);

// Order routes
router
  .route("/order/:orderId")
  .get([ValidationMiddleware.validateJWT, OrderController.get]);
router
  .route("/order/:orderId")
  .delete([ValidationMiddleware.validateJWT, OrderController.delete]);
router
  .route("/order/:orderId")
  .put([ValidationMiddleware.validateJWT, OrderController.update]);
router
  .route("/getOrders")
  .get([ValidationMiddleware.validateJWT, OrderController.getAll]);
router
  .route("/createOrders")
  .post([ValidationMiddleware.validateJWT, OrderController.create]);
router
  .route("/deleteOrders")
  .post([ValidationMiddleware.validateJWT, OrderController.deleteOrders]);

// machine routes
router
  .route("/machine/:orderId")
  .get([ValidationMiddleware.validateJWT, MachineController.get]);
router
  .route("/machine/:orderId")
  .delete([ValidationMiddleware.validateJWT, MachineController.delete]);
router
  .route("/machine/:orderId")
  .put([ValidationMiddleware.validateJWT, MachineController.update]);
router
  .route("/getMachines")
  .get([ValidationMiddleware.validateJWT, MachineController.getAll]);
router
  .route("/machine")
  .post([
    ValidationMiddleware.validateJWT,
    upload.single("image"),
    MachineController.create,
  ]);
router
  .route("/deleteMachines")
  .post([ValidationMiddleware.validateJWT, MachineController.deleteMachines]);

// stats routes
router
  .route("/ordersWeeklyStats")
  .get([
    ValidationMiddleware.validateJWT,
    StatsController.purchaseOrdersWeeklystats,
  ]);

module.exports = router;
