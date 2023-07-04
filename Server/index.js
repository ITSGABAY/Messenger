const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const db = require("./models");

const usersRouter = require("./routes/Users");
const uploadController = require("./routes/uploadController");
const postRouter = require("./routes/Posts");
const tryRouter = require("./routes/try");

app.use("/auth", usersRouter);
app.use("/upload", uploadController);
app.use("/post", postRouter);
app.use("/try", tryRouter);
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
