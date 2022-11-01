const purchaseService = require("../services/purchaseService");
const error = require("../middlewares/errorConstructor");

const addPurchase = async (req, res) => {
  const userId = req.params;
  const { totalPrice, totalQuantity, countryId, couponId } = req.body;

  if (!userId || !totalPrice || !totalQuantity || !countryId) {
    throw new error("KEY_ERROR");
  }

  await purchaseService.addPurchase(
    userId,
    totalPrice,
    totalQuantity,
    countryId,
    couponId
  );
};

module.exports = {
  addPurchase,
};
