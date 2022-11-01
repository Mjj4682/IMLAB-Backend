const express = require("express");
const couponController = require("../controllers/couponController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/", errorHandler(couponController.createCoupon));

module.exports = {
  router,
};
