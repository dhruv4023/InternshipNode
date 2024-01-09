const express = require("express");
const app = express();
const port = 80;

app.get("/", (req, res) => {
  res.status(202).send("helooooooooooo");
});
app.get("/this", (req, res) => {
  res.status(404).send("not found 404");
});
app.get("/ab", (req, res) => {
  res.send("byeeeeee");
});
app.post("/ab", (req, res) => {
  res.send("bye00000eeeee");
});
app.get("/ct", (req, res) => {
  res.send("hiiiiiiiiiii");
});

app.listen(port, () => {
  console.log("application started successfully!");
});
