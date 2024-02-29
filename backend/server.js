const express = require("express");
const { urlencoded } = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const { errorHandler } = require("./middlewares/errorMiddleware");
const db = require("./models");

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todoRoute"));

app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`listening to port: ${port}`));
});
