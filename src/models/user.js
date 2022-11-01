const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "User",
        tableName: "user",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Coupon, {
      foreignKey: "user_id",
      sourceKey: "id",
    });

    db.User.belongsTo(db.Country, {
      foreignKey: "country_id",
      targetKey: "id",
    });

    db.Country.hasMany(db.Order, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
};
