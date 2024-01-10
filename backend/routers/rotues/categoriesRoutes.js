const router = require("express").Router();
const {
  createNewCategory,
  getCategories,
} = require("../controllers/categories");
///create new category api
router.post("/createNewCategory", createNewCategory);
//get categories
router.post("/getCategories", getCategories);

module.exports = router;
