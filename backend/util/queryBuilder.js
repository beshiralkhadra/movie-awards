const { Op } = require("sequelize");

const arrayOfIds = (key, operationName, value) => {
  // this function to return where condition when i need it includes value in array
  if (operationName === "like") value = `%${value}%`;
  return {
    [key]: {
      [Op[operationName]]: value,
    },
  };
};

module.exports = {
  arrayOfIds,
};
