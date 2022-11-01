const express = require("express");
const purchaseRouter = require("./purchaseRouter");

const router = express.Router();

router.use("/purchase", purchaseRouter.router);

module.exports = router;
