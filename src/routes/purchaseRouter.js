const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const purchaseController = require("../controllers/purchaseController");

const router = express.Router();

router.post("/:userId", errorHandler(purchaseController.addPurchase));

module.exports = {
  router,
};
