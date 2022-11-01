const { CouponMeta, User, Coupon } = require("../models");
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

const giveCoupon = async (couponId, userId, expiredDate) => {
  const checkCouponId = await CouponMeta.findOne({
    attributes: ["id"],
    raw: true,
    where: { id: couponId },
  });
  if (!checkCouponId) {
    throw new error("없는 쿠폰입니다.", 400);
  }
  const checkUserId = await User.findOne({
    attributes: ["id"],
    raw: true,
    where: { id: userId },
  });
  if (!checkUserId) {
    throw new error("없는 유저입니다.", 400);
  }
  const checkUserHaveCoupon = await Coupon.count({
    where: { user_id: userId, coupon_metum_id: couponId },
  });
  if (checkUserHaveCoupon === 1) {
    throw new error("이미 쿠폰을 가지고 있습니다.", 400);
  }
  try {
    await Coupon.create({
      coupon_metum_id: couponId,
      user_id: userId,
      expired_date: `${expiredDate} 23:59:59`,
    });
  } catch (err) {
    throw new error("INVALID_DATA_INPUT", 500);
  }
};

const getCouponStatistics = async (couponId) => {
  const issuedCount = await Coupon.count({
    where: { coupon_metum_id: couponId },
  });
  const usedCount = await CouponMeta.findOne({
    attributes: [["count", "usedCount"]],
    raw: true,
    where: { id: couponId },
  });
  const totalDiscount = await CouponMeta.findOne({
    attributes: [["total_discount", "totalDiscount"]],
    raw: true,
    where: { id: couponId },
  });
  const couponStatistics = {
    issuedCount,
    ...usedCount,
    ...totalDiscount,
  };

  return couponStatistics;
};

module.exports = {
  createCoupon,
  giveCoupon,
  getCouponStatistics,
};
