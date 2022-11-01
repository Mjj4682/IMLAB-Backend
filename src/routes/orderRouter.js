const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const errorHandler = require("../middlewares/errorHandler");

router.get(
  "/list/:orderId(\\d+)",
  errorHandler(orderController.getOrderDetail)
);
router.get("/list", errorHandler(orderController.getOrderList));
router.patch(
  "/:orderId(\\d+)/:state",
  errorHandler(orderController.updateOrderState)
);
module.exports = {
  router,
};
