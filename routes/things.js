const express = require("express");
const router = express.Router();

router.use( function(req, res, next) {
  console.log(req.url,"@", Date.now(), "Daveed");
  next();
})

router
  .route("/cars")
  .get((req, res) => { 
    console.log("Get shitt");
    res.send("Hi, GET /things/cars");
  })
  .post((req, res) => {
    res.send("Hi, POST /things/cars");
  })


router
  .route("/cars/:carid")
  .get((req, res) => {
    res.send("Hi, get /things/cars/:" + req.params.carid)
  })
  .put((req, res) => {
    res.send("Hi, put /things/cars/:" + req.params.carid)
  })


module.exports = router;