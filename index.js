const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hi");
  console.error("Cooking something");
})

app.get("/api", (req, res) => {
  res.json({
    message: "Hey Dear!, welcome to this API service!!"
  })
})

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }else {
      res.json({
        message: "post created...",
        authData
      })
    }
  })
});


app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "John",
    email: "john@gmail.com"
  }

  jwt.sign({user: user}, "secretkeyKey", (err, token) => {
    res.json({
      token
    })
  })
})

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["Authorization"];

  if(typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split("")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}


app.listen(3004, () => {
  console.log("App is running on port 3004...")
})