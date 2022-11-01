const express = require("express");
const purchaseRouter = require("./purchaseRouter");

const router = express.Router();
const couponRouter = require("./couponRouter.js");

router.use("/coupon", couponRouter.router);
router.use("/purchase", purchaseRouter.router);

module.exports = router;
