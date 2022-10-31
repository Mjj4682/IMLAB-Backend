const Sequelize = require("sequelize");

module.exports = class OrderState extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "OrderState",
        tableName: "order_state",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.OrderState.hasMany(db.Order, {
      foreignKey: "order_state_id",
      sourceKey: "id",
    });
  }
};
