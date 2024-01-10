const { Category } = require('../models');

const createNewCategoryApi = async (categoryDTO) => {
  try {
    return await Category.create(categoryDTO);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createNewCategoryApi,
};
