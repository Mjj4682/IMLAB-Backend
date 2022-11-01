const purchaseService = require("../services/purchaseService");
const error = require("../middlewares/errorConstructor");

const addPurchase = async (req, res) => {
  const { userId } = req.params;
  const { price, quantity, countryId, couponId } = req.body;

  if (!userId || !price || !quantity || !countryId) {
    throw new error("KEY_ERROR", 400);
  }

  await purchaseService.addPurchase(
    userId,
    price,
    quantity,
    countryId,
    couponId
  );

  res.status(201).json({ message: "Purchase success" });
};

module.exports = {
  addPurchase,
};
