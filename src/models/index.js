const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const CouponMeta = require("./CouponMeta");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.CouponMeta = CouponMeta;

CouponMeta.init(sequelize);

CouponMeta.associate(db);

module.exports = db;
