require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./routers/userRouter");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.use(userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
