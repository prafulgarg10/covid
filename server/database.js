const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const MongoClient = require("mongodb").MongoClient;

app.use(express.static(__dirname + "../client"));

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/", "index.html"));
});

app.post("/detail_post", urlencodedParser, function (req, res) {
  response = {
    Fullname: req.body.name,
    Email: req.body.email,
    Message: req.body.message,
    Phone: req.body.phone,
  };
  MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
    if (err) throw err;
    console.log("Connected to Database");
    const dbo = db.db("mycustomer");
    dbo.collection("customers").insertOne(response, function (err, result) {
      if (err) throw err;
      console.log("1 Document Inserted");
    });
    console.log(response);
    res.send("Query recieved successfully!");
    res.end(JSON.stringify(response));
  });
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s//register", host, port);
});