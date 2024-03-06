const express = require("express");
const app = express();
const bcrypt = require(bcrypt);

app.use(express.json);
const users = [];

app.listen(3000);

app.get("/users", (req, res) => {
  res.json(users);
});

//User Login Routes
app.post("/users.json", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});
app.post("/users.json/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user === null) {
    return res.status(400).send("Cannot Find User");
  }
  try {
     await bcrypt.compare(bcrypt.body.password,  user.password);
     res.send("Login Successful.")
  } catch {
    res.status(500).send();
  }
});
app.post("/users.json/auth/logout", (req, res) => {});

//Book Routes
app.get("/BookAPI.json/books");

//set users into mongodb when needed
