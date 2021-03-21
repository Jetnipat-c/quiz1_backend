const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 9999;

app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

let user = { name: "cheer", age: 23 };

router
  .route("/user")
  .get((req, res) => {
    res.send(user);
  })
  .put((req, res) => {
    user.name = req.body.name;
    res.send(user);
  });
app.listen(PORT, () => {
  console.log("Server running port ", PORT);
});
