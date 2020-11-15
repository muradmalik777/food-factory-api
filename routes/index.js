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
  .route("/orders/:orderId")
  .delete([ValidationMiddleware.validateJWT, OrdersController.delete]);
router
  .route("/orders/:orderId")
  .put([ValidationMiddleware.validateJWT, OrdersController.update]);
router
  .route("/orders")
  .get([ValidationMiddleware.validateJWT, OrdersController.getAll]);
router
  .route("/orders/create")
  .post([ValidationMiddleware.validateJWT, OrdersController.create]);
router
  .route("/orders/delete")
  .post([ValidationMiddleware.validateJWT, OrdersController.deleteOrders]);

module.exports = router;
