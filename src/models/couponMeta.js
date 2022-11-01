const Sequelize = require("sequelize");

module.exports = class CouponMeta extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        target: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        total_discount: {
          type: Sequelize.DECIMAL(9, 1),
          defaultValue: 0,
          allowNull: false,
        },
        created_at: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        moduleName: "CouponMeta",
        tableName: "coupon_meta",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.CouponMeta.hasMany(db.Coupon, {
      forignKey: "coupon_meta_id",
      sourceKey: "id",
    });
  }
};
