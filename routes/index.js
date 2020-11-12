const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const AuthController = require("../controllers/auth.controller");
const OrdersController = require("../controllers/orders.controller");

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
  .route("/orders/:orderId")
  .get([ValidationMiddleware.validateJWT, OrdersController.get]);
router
  .route("/orders")
  .get([ValidationMiddleware.validateJWT, OrdersController.getAll]);
router
  .route("/createOrders")
  .post([ValidationMiddleware.validateJWT, OrdersController.create]);

module.exports = router;
