const { Coupon, Country } = require("../models");
const { Op } = require("sequelize");

const getNow = async () => {
  const now = new Date();
  const year = String(now.getFullYear()).padStart(2, "0");
  const month = String(now.getMonth()).padStart(2, "0");
  const day = String(now.getDay()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const tmp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  return tmp;
};

const checkCountryById = async (countryId) => {
  const result = await Country.findAll(
    { raw: true },
    {
      where: { id: countryId },
    }
  );

  return result;
};

const checkCouponExpireDate = async (couponId) => {
  const expireDate = await Coupon.findAll(
    {
      attributes: ["expired_date"],
      raw: true,
    },
    {
      where: { [Op.in]: couponId },
    }
  );

  return expireDate;
};

const addPurchase = async (
  userId,
  totalPrice,
  totalQuantity,
  countryId,
  couponId
) => {
  const today = await getNow();
  const checkCoupon = await checkCouponExpireDate(couponId);
  const checkCountry = await checkCountryById(countryId);

  console.log(today);
  console.log(checkCoupon);
  console.log(checkCountry);
};
