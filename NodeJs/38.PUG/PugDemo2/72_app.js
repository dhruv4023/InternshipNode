const express = require("express");
const path = require("path"); 
const app = express();
const port = 3000;

// for serving static files
app.use("/static", express.static("static"));

// set the template engine as pug
app.set('view engine', 'pug');

// set the view directory
app.set("views", path.join(__dirname, "views"));

// our pug demo endpoint
app.get("/demo", (req, res) => {
  res.status(200).render('demo', {
    title: 'hey harr',
    message:'hello how are are you ?',
  })
});
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
