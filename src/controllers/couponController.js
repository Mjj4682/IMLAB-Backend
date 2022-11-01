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

const giveCoupon = async (req, res) => {
  const dateReg = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  const couponId = req.params.couponid;
  const userId = req.params.userid;
  const { expiredDate } = req.body;
  if (!dateReg.test(expiredDate)) {
    throw new error("expiredDate must be YYYY-MM-DD", 400);
  }
  await couponService.giveCoupon(couponId, userId, expiredDate);
  res.status(201).json({ message: "gave coupon" });
};

module.exports = {
  createCoupon,
  giveCoupon,
};
