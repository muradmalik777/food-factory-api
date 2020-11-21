const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const AuthController = require("../controllers/auth.controller");
const OrdersController = require("../controllers/orders.controller");

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
  .get([ValidationMiddleware.validateJWT, OrdersController.get]);
router
  .route("/order/:orderId")
  .delete([ValidationMiddleware.validateJWT, OrdersController.delete]);
router
  .route("/order/:orderId")
  .put([ValidationMiddleware.validateJWT, OrdersController.update]);
router
  .route("/getOrders")
  .get([ValidationMiddleware.validateJWT, OrdersController.getAll]);
router
  .route("/createOrders")
  .post([ValidationMiddleware.validateJWT, OrdersController.create]);
router
  .route("/deleteOrders")
  .post([ValidationMiddleware.validateJWT, OrdersController.deleteOrders]);

module.exports = router;
