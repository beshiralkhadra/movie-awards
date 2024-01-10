const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require("crypto");
const { Category, Nominee } = require("../../models");
const { arrayOfIds } = require("../../util/queryBuilder");
const { createNewCategoryApi } = require("../../services/categoryIndex");

const createNewCategory = async (req, res) => {
  const { name } = req.body;
  try {
    let categoryDTO = {
      id: `NOMINEES-CATEGORIES-${crypto.randomUUID()}`,
      name,
    };
    let response = await createNewCategoryApi(categoryDTO);
    res.status(201).json({
      status: "success",
      row: {
        response,
      },
    });
  } catch (error) {
    res.status(402).json({
      status: "failed",
      message: error.message,
    });
  }
};
const getCategories = async (req, res) => {
  try {
    const { arrayId } = req.body;
    const whereCondition = arrayId ? arrayOfIds("id", "in", arrayId) : {};

    const categories = await Category.findAll({
      where: whereCondition,
      attributes: {
        exclude: ["seq", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Nominee,
          as: "nominees",
          attributes: {
            exclude: ["seq", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      results: categories.length,
      row: {
        categories,
      },
    });
  } catch (error) {
    res.status(402).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  createNewCategory,
  getCategories,
};
