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
    { id: 09901, name: "moji", age: 5 },
    { id: 09902, name: "yaki", age: 2 },
  ],
};

router
  .route("/animal")
  .get((req, res) => {
    res.send(animal.list);
  })
  .post((req, res) => {
    console.log(req.body);
    let newAnimal = {};
    //console.log(animal.list.length ? animal.list[animal.list.length - 1].id + 1 : 1);
    newAnimal.id = animal.list.length
      ? animal.list[animal.list.length - 1].id + 1
      : 1;
    newAnimal.name = req.body.name;
    newAnimal.age = req.body.age;
    animal = { list: [...animal.list, newAnimal] };
    res.json(animal);
  });

router
  .route("/animal/:id")
  .get((req, res) => {
    let id = animal.list.findIndex((item) => item.id == +req.params.id);
    res.json(animal.list[id]);
  })
  .put((req, res) => {
    let id = animal.list.findIndex((item) => item.id == +req.params.id);
    animal.list[id].name = req.body.name;
    animal.list[id].age = req.body.age;
    res.json(animal.list);
  })
  .delete((req, res) => {
    animal.list = animal.list.filter((item) => +item.id !== +req.params.id);
    res.json(animal.list);
  });

app.listen(PORT, () => {
  console.log("Server running at ", PORT);
});
