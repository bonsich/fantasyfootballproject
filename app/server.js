let express = require("express");
let env = require("../env.json");
let bcrypt = require('bcrypt');
let session = require("express-session");
let hostname = "localhost";
let port = 3000;
let app = express();


const { v4: uuidv4 } = require('uuid');

const newId = uuidv4();
console.log(newId);

app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: "GSIAJDBANEJKSI",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

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

app.post("/log_in", async (req, res) => {
    let body = req.body;
    if (
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password") ||
        body.username === "" ||
        body.password === ""
    ) {
        console.log("Missing Username/Password");
        return res.status(400).send("Missing Username/Password");
    }
    if (req.session.user){
        console.log("Already Logged In");
        return res.status(400).send("Already Logged In.");
    }
    const user = usersDatabase.find(user => user.username === body.username);
    
    if(!user){
        console.log("Username Doesn't Exist");
        return res.status(400).send("Username Doesn't Exist");
    }

    let isMatch = await bcrypt.compare(body.password, user.password);
    if (isMatch){
        console.log("Successfull Log In");
        req.session.user = {
            username: user.username
        };
        return res.status(200).send("Login Successful! Welcome Back!");
    } else{
        console.log("Invalid Password");
        res.status(400).send("Invalid Username/Password.");
    }
})

app.get("/create_league", hasValidSession, (req, res) => {
    console.log("Create League Accessed as " + req.session.user.username + "!");
});

// Usable as such app.get(..., hasValidSession, (req,res) => {})
// req.session.user has information
function hasValidSession (req,res,next) {
    if (req.session && req.session.user){
        return next();
    }
    return res.status(400).send("Log in to access this page");
}

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});