require("dotenv").config();
const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
const port = process.env.PORT || 3001;
app.get("/", (req, res) => res.send("Dat App"));
const nomineesRoutes = require("./routers/rotues/nomineesRoutes");
const categoriesRoutes = require("./routers/rotues/categoriesRoutes");

///all routes needed
app.use("/nominee", nomineesRoutes);
app.use("/category", categoriesRoutes);

app.listen(port, async () => {
  try {
    console.log(`app listening on http://localhost:${port}`);
    await sequelize.sync().then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.error(error);
  }
});
