let express = require("express");
let env = require("../env.json");

let hostname = "localhost";
let port = 3000;
let app = express();

const { v4: uuidv4 } = require('uuid');

const newId = uuidv4();
console.log(newId);

app.use(express.json());
app.use(express.static("public"));

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});