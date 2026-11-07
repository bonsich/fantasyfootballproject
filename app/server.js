let express = require("express");
let env = require("../env.json");
let bcrypt = require('bcrypt');
let hostname = "localhost";
let port = 3000;
let app = express();


const { v4: uuidv4 } = require('uuid');

const newId = uuidv4();
console.log(newId);

app.use(express.json());
app.use(express.static("public"));

const usersDatabase = [];

app.post("/sign_up", async (req, res) => {
    let body = req.body;
    if (
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password") ||
        body.username === "" ||
        body.password === ""
    ) {
        return res.status(400).send("Missing Email/Password");
    }

    if(usersDatabase.find(user => user.username === body.username)){
        return res.status(400).send("An account with this username already exists");
    }

    let hashedPassword = await bcrypt.hash(body.password, 5);
    const newUser = {
        username: body.username,
        password: hashedPassword
    };
    usersDatabase.push(newUser);
    console.log(usersDatabase);
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});