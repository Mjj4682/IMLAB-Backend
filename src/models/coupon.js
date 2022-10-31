const Sequelize = require("sequelize");

module.exports = class Coupon extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        expired_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        used: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "Coupon",
        tableName: "coupon",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.Coupon.belongsTo(db.CouponMeta, {
      foreignKey: "coupon_meta_id",
      targetKey: "id",
    });

    db.Coupon.hasMany(db.User, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
};
