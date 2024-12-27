const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// custom method for logging POST request content
morgan.token("req-body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// log
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

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

app.post("/api/persons", (request, response) => {
  const randomNumber = () => {
    const min = persons.length + 1;
    return Math.floor(Math.random() * 1000) + min;
  };
  const { name, number } = request.body;

  if (!name || (!number && name === "") || number === "") {
    return response.status(404).send({ error: "Name or number missing!" });
  }

  const nameExists = persons.find((person) => person.name === name);

  if (nameExists) {
    return response.status(403).send({ error: "name must be unique" });
  }
  const newContact = { name, number };

  newContact.id = randomNumber().toString();
  const updatedPersons = persons.concat(newContact);
  //   response.status(201).send("Contact person created successfully!");
  return response.status(201).send(updatedPersons);
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
  console.log("App listening in port", PORT);
});
