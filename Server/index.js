const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const msgFilter = socket.handshake.query.msgFilter;
  socket.join(msgFilter);

  console.log("Socket Created " + msgFilter);

  socket.on("clientToServer", (data) => {
    console.log("data clientToServer ::: ", data);
    io.to(data.msgFilter).emit("serverToClient", {
      text: data.text,
      image: data.image,
    });
  });

  socket.on("disconnect", () => {
    console.log(msgFilter + " disconnected");
  });
});

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
const profileRouter = require("./routes/Profile");
const commentRouter = require("./routes/Comments");
const searchRouter = require("./routes/Search");
const chatRouter = require("./routes/Chat");
app.use("/auth", usersRouter);
app.use("/upload", uploadController);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/profile", profileRouter);
app.use("/search", searchRouter);
app.use("/chat", chatRouter);
db.sequelize.sync().then(() => {
  server.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
