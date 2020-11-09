const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// router.route("/user/:userId").get([UserController.get]);
router.route("/user").get([UserController.getAll]);
router.route("/user").post([UserController.create]);

module.exports = router;
