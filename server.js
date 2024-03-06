const express = require("express");
const cors = require("cors");
const path = require("path")

//require("dotenv").config();
const api = require("./api");

const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => {
  res.send("API running")
})
app.use("/api", api)


app.listen(5555, () => {
  console.log('====================================');
  console.log(`SERVER RUNNING ON PORT: 5555`);
  console.log('====================================');
});