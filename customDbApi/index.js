const { response } = require("express");
const express = require("express");
const app = express();
const users = require("./users.json");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.post("/login", requiresAuth, (req, res) => {
  let user = {};

  if (!req.body.email || req.body.email === "bad@test.com") {
    return res.status(500).send("An error has occured.");
  }

  Object.assign(user, getUser(req.body.email));
  if (!user.email) {
    res.status(404).send("Invalid Credentials.");
    return;
  }

  if (user.password !== req.body.password) {
    res.status(404).send("Invalid Credentials.");
    return;
  }

  delete user.password;

  res.send(user);
});

app.post("/getUser", requiresAuth, (req, res) => {
  let user = {};

  if (!req.body.email || req.body.email === "bad@test.com") {
    res.status(500).send("An error has occured.");
  }

  Object.assign(user, getUser(req.body.email));
  if (!user.email) {
    res.status(404).send();
    return;
  }

  delete user.password;

  res.send(user);
});

function getUser(id) {
  return users.find((x) => x.email === id);
}

function requiresAuth(req, res, next) {
  if (req.headers["x-api-key"] != process.env.API_KEY) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
