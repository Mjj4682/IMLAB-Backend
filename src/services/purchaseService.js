const error = require("../middlewares/errorConstructor");
const { Coupon, Country, sequelize, Order, CouponMeta } = require("../models");
const { getDollerRate, getDeliveryCost } = require("../middlewares/redis");

const getNow = async () => {
  const now = new Date();
  const year = String(now.getFullYear()).padStart(2, "0");
  const month = String(now.getMonth()).padStart(2, "0");
  const day = String(now.getDay()).padStart(2, "0");

  const tmp = `${year}-${month}-${day}`;
  return tmp;
};

// 총 할인액 계산
const getDiscount = async (
  price,
  quantity,
  cost,
  target,
  exchangeRate,
  countryName
) => {
  const totalPrice = price * quantity + cost;
  const percentReg = /^[0-9]{1,2}%$/;
  const numberReg = /^[0-9]{1,8}$/;
  let discountPrice;

  if (percentReg.test(target)) {
    const sale = Number(target.slice(0, -1));
    discountPrice = totalPrice * (sale / 100);
  } else if (numberReg.test(target)) {
    const sale = Number(target);
    discountPrice = sale;
  } else if (target === "배송비") {
    discountPrice = cost;
  } else {
    throw new error("KEY_ERROR");
  }
  if (countryName !== "South_Korea") {
    const result = discountPrice * exchangeRate;
    return Number(result.toFixed(1));
  }
  return discountPrice;
};

// 구매하기
const addPurchase = async (userId, price, quantity, countryId, couponId) => {
  const today = getNow();
  const getExchange = await getDollerRate();
  const exchangRate = Number(getExchange.replace(",", ""));
  const deliveryCost = await getDeliveryCost();
  const checkCountry = await Country.findOne({
    attributes: ["name"],
    raw: true,
    where: { id: countryId },
  });
  if (!checkCountry) {
    throw new error("INVALID_COUNTRY", 400);
  }
  const countryName = checkCountry.name.split(" ").join("_");
  if (!deliveryCost[countryName] && countryName !== "South_Korea") {
    throw new error("배송 가능한 국가가 아닙니다.", 404);
  }
  let cost = 0;
  if (countryName === "South_Korea") {
    cost = 0;
  } else {
    const rawCost = Number(deliveryCost[countryName][quantity.toString()]);
    cost = Number((rawCost / exchangRate).toFixed(1));
  }

  if (couponId) {
    const checkCoupon = await Coupon.findOne({
      attributes: ["expired_date", "used", "coupon_metum_id"],
      raw: true,
      where: { id: couponId },
    });
    if (
      !checkCoupon ||
      checkCoupon.expired_date < today ||
      checkCoupon.used === 1
    ) {
      throw new error("INVALID_COUPON", 400);
    }
    const t = await sequelize.transaction();
    try {
      await Order.create(
        {
          user_id: userId,
          price: price,
          quantity: quantity,
          delivery_cost: cost,
          order_state_id: 1,
          delivery_state_id: 1,
        },
        { transaction: t }
      );
      await Coupon.update(
        { used: 1 },
        { where: { id: couponId }, transaction: t }
      );
      await CouponMeta.increment(
        "count",
        {
          by: 1,
          where: { id: checkCoupon.coupon_metum_id },
        },
        { transaction: t }
      );
      const findTarget = await CouponMeta.findOne(
        {
          attributes: ["target"],
          raw: true,
          where: { id: checkCoupon.coupon_metum_id },
        },
        { transaction: t }
      );
      const totalDiscount = await getDiscount(
        price,
        quantity,
        cost,
        findTarget.target,
        exchangRate,
        countryName
      );
      await CouponMeta.increment(
        "total_discount",
        {
          by: totalDiscount,
          where: { id: checkCoupon.coupon_metum_id },
        },
        { transaction: t }
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw new error(err.message, err.statusCode);
    }
  } else {
    await Order.create({
      user_id: userId,
      price: price,
      quantity: quantity,
      delivery_cost: cost,
      order_state_id: 1,
      delivery_state_id: 1,
    });
  }
};

module.exports = {
  addPurchase,
};
