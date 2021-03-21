const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 6969;

app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

let todo = {
  list: [
    { id: 1, title: "Homework 1", status: "Not started yet" },
    { id: 2, title: "Homework 2", status: "Not started yet" },
  ],
};

router
  .route("/todo")
  .get((req, res) => {
    res.send(todo);
  })
  .post((req, res) => {
    console.log(req.body);
    let newtodo = {};
    //console.log(todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1);
    newtodo.id = todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1;
    newtodo.title = req.body.title;
    newtodo.status = req.body.status;
    todo = { list: [...todo.list, newtodo] };
    res.json(todo);
  });

router
  .route("/todo/:id")
  .get((req, res) => {
    let id = todo.list.findIndex((item) => item.id == +req.params.id);
    res.json(todo.list[id]);
  })
  .put((req, res) => {
    console.log(req.body.title);
    console.log(req.body.status);
    let id = todo.list.findIndex((item) => item.id == +req.params.id);
    todo.list[id].title = req.body.title;
    todo.list[id].status = req.body.status;
    res.json(todo.list);
  })
  .delete((req, res) => {
    todo.list = todo.list.filter((item) => +item.id !== +req.params.id);
    res.json(todo.list);
  });

app.listen(PORT, () => {
  console.log("Server running at ", PORT);
});
