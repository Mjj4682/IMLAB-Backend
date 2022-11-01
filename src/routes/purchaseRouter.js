const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/:userId", errorHandler(purchaseController.addPurchase));

module.exports = {
  router,
};
