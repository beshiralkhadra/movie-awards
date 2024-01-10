const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nominee extends Model {
    static associate(models) {
      Nominee.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Nominee.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      id: { type: DataTypes.STRING, allowNull: false },

      category_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      director: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      release_date: {
        type: DataTypes.DATE,
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: 1000000,
      sequelize,
      modelName: "Nominee",
      tableName: "NOMINEES_LIST",
      underscored: true,
      freezeTableName: true,
    }
  );
  return Nominee;
};
