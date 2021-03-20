const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 6969;

app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

let animal = {
  list: [
    { id: 00123, name: "moji", age: 5 },
    { id: 14870, name: "yaki", age: 2 },
  ],
};

router.route("/animal").get((req, res) => {
  res.send(animal.list);
});

app.listen(PORT, () => {
  console.log("Server running at ", PORT);
});
