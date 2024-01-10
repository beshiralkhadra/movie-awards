const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Nominee, {
        as: "nominees",
        foreignKey: "categoryId",
        sourceKey: "seq",
      });
    }
  }
  Category.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: { type: DataTypes.STRING, allowNull: false },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Category",
      tableName: "NOMINEES_CATEGORIES",
      underscored: true,
      freezeTableName: true,
    }
  );
  return Category;
};
