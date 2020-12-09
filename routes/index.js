const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const AuthController = require("../controllers/auth.controller");
const OrderController = require("../controllers/order.controller");
const StatsController = require("../controllers/stats.controller");
const MachineController = require("../controllers/machine.controller");
const ProductController = require("../controllers/product.controller");
const RecipeController = require("../controllers/recipe.controller");
const RosterController = require("../controllers/roster.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let ext = "";
    if (file.originalname.split(".").length > 1) {
      ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    }
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

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
  .route("/orders")
  .get([ValidationMiddleware.validateJWT, OrderController.getAll]);
router
  .route("/orders")
  .post([ValidationMiddleware.validateJWT, OrderController.createOrders]);
router
  .route("/deleteOrders")
  .post([ValidationMiddleware.validateJWT, OrderController.deleteOrders]);

// Machine routes
router
  .route("/machine/:machineId")
  .get([ValidationMiddleware.validateJWT, MachineController.get]);
router
  .route("/machine/:machineId")
  .delete([ValidationMiddleware.validateJWT, MachineController.delete]);
router
  .route("/machine/:machineId")
  .put([ValidationMiddleware.validateJWT, MachineController.update]);
router
  .route("/machines")
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

// Product routes
router
  .route("/product/:productId")
  .get([ValidationMiddleware.validateJWT, ProductController.get]);
router
  .route("/product/:productId")
  .delete([ValidationMiddleware.validateJWT, ProductController.delete]);
router
  .route("/product/:productId")
  .put([
    ValidationMiddleware.validateJWT,
    upload.single("image"),
    ProductController.update,
  ]);
router
  .route("/products")
  .get([ValidationMiddleware.validateJWT, ProductController.getAll]);
router
  .route("/products")
  .post([ValidationMiddleware.validateJWT, ProductController.create]);
router
  .route("/deleteProducts")
  .post([ValidationMiddleware.validateJWT, ProductController.deleteMachines]);

// Recipe routes
router
  .route("/recipe/:recipeId")
  .get([ValidationMiddleware.validateJWT, RecipeController.get]);
router
  .route("/recipe/:recipeId")
  .delete([ValidationMiddleware.validateJWT, RecipeController.delete]);
router
  .route("/recipe/:recipeId")
  .put([ValidationMiddleware.validateJWT, RecipeController.update]);
router
  .route("/recipies")
  .get([ValidationMiddleware.validateJWT, RecipeController.getAll]);
router
  .route("/recipies")
  .post([ValidationMiddleware.validateJWT, RecipeController.createRecipies]);
router
  .route("/deleteRecipies")
  .post([ValidationMiddleware.validateJWT, RecipeController.deleteRecipies]);

// Roster routes
router
  .route("/roster/:rosterId")
  .get([ValidationMiddleware.validateJWT, RosterController.get]);
router
  .route("/roster/:rosterId")
  .delete([ValidationMiddleware.validateJWT, RosterController.delete]);
router
  .route("/roster/:rosterId")
  .put([ValidationMiddleware.validateJWT, RosterController.update]);
router
  .route("/rosters")
  .get([ValidationMiddleware.validateJWT, RosterController.getAll]);
router
  .route("/rosters")
  .post([ValidationMiddleware.validateJWT, RosterController.createRosters]);
router
  .route("/deleteRosters")
  .post([ValidationMiddleware.validateJWT, RosterController.deleteRosters]);

// Stats routes
router
  .route("/ordersWeeklyStats")
  .get([ValidationMiddleware.validateJWT, StatsController.ordersWeeklystats]);
// Stats routes
router
  .route("/productsWeeklyStats")
  .get([ValidationMiddleware.validateJWT, StatsController.productsWeeklystats]);
// Stats routes
router
  .route("/rostersWeeklyStats")
  .get([ValidationMiddleware.validateJWT, StatsController.rostersWeeklystats]);

module.exports = router;
