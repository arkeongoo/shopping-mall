const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("연결 완료");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  throw new Error("it is an error!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

const port = 4000;
app.listen(port, () => {
  console.log(`${port}번에서 실행되었습니다.`);
});

// uploads/ 디렉토리를 정적 파일로 제공
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
