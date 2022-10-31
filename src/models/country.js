const Sequelize = require("sequelize");

module.exports = class Country extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        country_code: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        country_decode: {
          type: Sequelize.SMALLINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "Country",
        tableName: "country",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.Country.hasMany(db.User, {
      foreignKey: "country_id",
      sourceKey: "id",
    });
  }
};
