const { CouponMeta } = require("../models");
const error = require("../middlewares/errorConstructor");

const createCoupon = async (couponName, couponTarget) => {
  const checkCouponName = await CouponMeta.findOne({
    attributes: ["name"],
    raw: true,
    where: { name: couponName },
  });
  if (checkCouponName) {
    throw new error("중복된 쿠폰명입니다.", 400);
  }
  try {
    await CouponMeta.create({
      name: couponName,
      target: couponTarget,
    });
  } catch (err) {
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

module.exports = {
  createCoupon,
};
