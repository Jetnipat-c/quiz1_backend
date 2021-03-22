const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 3001;

app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

let pets = {
  list: [
    { id: 1, type: "cat", age: 1, weight: 5, price: 2000 },
    { id: 2, type: "dogs", age: 1, weight: 10, price: 3000 },
  ],
};

let income = 0;

router
  .route("/pets")
  .get((req, res) => {
    res.send(pets);
  })
  .post((req, res) => {
    console.log(req.body);
    let newPet = {};
    //console.log(todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1);
    newPet.id = pets.list.length ? pets.list[pets.list.length - 1].id + 1 : 1;
    newPet.type = req.body.type;
    newPet.age = req.body.age;
    newPet.weight = req.body.weight;
    newPet.price = req.body.price;
    pets = { list: [...pets.list, newPet] };
    res.json(pets);
  });

router
  .route("/pets/:petid")
  .get((req, res) => {
    let id = pets.list.findIndex((item) => +item.id == +req.params.petid)
    //console.log("id",id)
    res.json(pets.list[id]);
  })
  .put((req, res) => {
    let id = pets.list.findIndex((item) => item.id == +req.params.petid);
    pets.list[id].type = req.body.type;
    pets.list[id].age = req.body.age;
    pets.list[id].weight = req.body.weight;
    pets.list[id].price = req.body.price;
    res.json(pets.list);
  })
  .delete((req, res) => {
    pets.list = pets.list.filter((item) => +item.id !== +req.params.petid);
    res.json(pets.list);
  });

router.route("/income")
.get((req,res) => {
  console.log("sss")
  res.json(income)
});

router.route("/purchase/:petId")
.post((req,res) => {
  let id = pets.list.findIndex((item) => +item.id == +req.params.petId)
  if (id == -1) {
    res.json({message: "Pet not found"})
  }
  else {
    income = pets.list[id].price;
    console.log(income)
    pets.list = pets.list.filter((item) => +item.id !== +req.params.petId);
    res.json(pets.list);
  }
})

app.listen(PORT, () => {
  console.log("Server running at ", PORT);
});
