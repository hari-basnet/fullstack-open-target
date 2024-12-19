const express = require("express");
const app = express();

const persons = [
  {
    id: "1",
    name: "Hari Basnet",
    number: "0407407800",
  },
  {
    id: "2",
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

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const result = persons.find((person) => person.id === id);

  if (!result) {
    response.status(404).send("Not found");
  }
  response.json(result);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const result = persons.filter((person) => person.id !== id);
  response.send(`Person with id ${result.id} has been successfully deleted!`);
});

app.get("/info", (request, response) => {
  const currentDate = new Date();
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p></br><p>${currentDate.toString()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("App listening in port ", PORT);
});
