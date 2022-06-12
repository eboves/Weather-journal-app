const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

const app = express();
// projectData will be the endpoint. every info will be store here
// const projectData = {};

app.use(express.static("website"));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, function () {
  console.log("Server running on port: ", PORT);
});

const data = [];

app.post("/add", addJournal);

function addJournal(req, res) {
  data.push(req.body);
  res.json({
    feeling: data[0].feeling,
    temp: data[0].temp,
    date: data[0].date,
  });
  console.log("serverDATA: ", data);
  //   return data;
}
