const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRouter = require("./routes/Users");
const uploadController = require("./routes/uploadController");
app.use("/auth", usersRouter);
app.use("/upload", uploadController);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
