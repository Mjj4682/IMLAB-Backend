const couponService = require("../services/couponService");
const error = require("../middlewares/errorConstructor");

const createCoupon = async (req, res) => {
  const { couponName, couponTarget } = req.body;
  if (!couponName) {
    throw new error("empty couponName", 400);
  }
  const percentReg = /^[0-9]{1,2}%$/;
  const numberReg = /^[0-9]{1,8}$/;
  if (
    !percentReg.test(couponTarget) &
    !numberReg.test(couponTarget) &
    (couponTarget !== "배송비")
  ) {
    throw new error("couponTarget must be (number)% or number or 배송비", 400);
  }
  await couponService.createCoupon(couponName, couponTarget);
  res.status(201).json({ message: "created coupon" });
};

module.exports = {
  createCoupon,
};
