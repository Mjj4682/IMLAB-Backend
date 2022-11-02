const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const CouponMeta = require("./couponMeta");
const Coupon = require("./coupon");
const Country = require("./country");
const User = require("./user");
const OrderState = require("./orderState");
const DeliveryState = require("./deliveryState");
const Order = require("./order");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.CouponMeta = CouponMeta;
db.Coupon = Coupon;
db.Country = Country;
db.User = User;
db.OrderState = OrderState;
db.DeliveryState = DeliveryState;
db.Order = Order;

CouponMeta.init(sequelize);
Coupon.init(sequelize);
Country.init(sequelize);
User.init(sequelize);
OrderState.init(sequelize);
DeliveryState.init(sequelize);
Order.init(sequelize);

CouponMeta.associate(db);
Coupon.associate(db);
Country.associate(db);
User.associate(db);
OrderState.associate(db);
DeliveryState.associate(db);
Order.associate(db);

module.exports = db;
