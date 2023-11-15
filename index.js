const express = require("express");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const secrete = require('crypto').randomBytes(64).toString('hex')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", async (req, res) => {
  res.send("Hi");
  console.error("Cooking something");
  console.log(secrete);
//   const { createHmac } = await import('node:crypto');
//   const secret = 'abcdefg';
//   const hash = createHmac('sha256', secret)
//                .update('I love cupcakes')
//                .digest('hex');
// console.log(hash);
  
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

app.get('/protected-route', (req, res) => {
  // Your protected route logic here
  res.send('This route is protected');
});

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied Dave');

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).send('Invalid token Guyy');
    req.user = user;
    next();
  });
}

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["Authorization"];

//   if(typeof bearerHeader !== "undefined") {
//     const bearerToken = bearerHeader.split("")[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }


app.listen(3004, () => {
  console.log("App is running on port 3004...")
})