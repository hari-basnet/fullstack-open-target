const express = require("express");
const app = express();

const persons = [
  {
    id: 1,
    name: "Hari Basnet",
    number: "0407407800",
  },
  {
    id: 1,
    name: "Muna Thapa Basnet",
    number: "0407407801",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("App listening in port ", PORT);
});
