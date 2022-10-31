const Sequelize = require("sequelize");

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        total_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        delivery_cost: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        delivery_number: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Order",
        tableName: "order",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.Order.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });

    db.Order.belongsTo(db.OrderState, {
      foreignKey: "order_state_id",
      targetKey: "id",
    });

    db.Order.belongsTo(db.DeliveryState, {
      foreignKey: "delivery_state_id",
      targetKey: "id",
    });
  }
};
