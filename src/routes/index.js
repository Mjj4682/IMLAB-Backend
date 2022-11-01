const express = require("express");
const router = express.Router();

const purchaseRouter = require("./purchaseRouter");
const couponRouter = require("./couponRouter.js");
const orderRouter = require("./orderRouter");

router.use("/coupon", couponRouter.router);
router.use("/purchase", purchaseRouter.router);
router.use("/order", orderRouter.router);

module.exports = router;
