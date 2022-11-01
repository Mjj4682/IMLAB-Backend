const express = require("express");

const router = express.Router();
const couponRouter = require("./couponRouter.js");

router.use("/coupon", couponRouter.router);

module.exports = router;
