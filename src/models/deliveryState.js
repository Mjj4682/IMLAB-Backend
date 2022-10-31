const Sequelize = require("sequelize");

module.exports = class DeliveryState extends Sequelize.Model {
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
        modelName: "DeliveryStatus",
        tableName: "delivery_status",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.DeliveryState.hasMany(db.Order, {
      foreignKey: "delivery_state_id",
      sourceKey: "id",
    });
  }
};
