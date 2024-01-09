const express = require("express");
const path = require("path");
const fs= require("fs");
const app = express();
const port = 3000;

// Express specific stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded()); // tut-74

// PUG SPECIFIC stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// END POINT
app.get("/", (req, res) => {
  const con =
    "Mango. Mangos are one of the most commonly consumed fruits in the world.";
  const params = { title: "pug is the most popular", content: con };
  res.status(200).render("index.pug", params);
});

// tutorial 74
app.post("/", (req, res) => {
  let name=req.body.name;
  let age=req.body.age;
  let email=req.body.email;
  console.log(`${name} ${age} ${email}`);
  let outputToWrite= `the name of client :  ${name} \nage : ${age} \nemail : ${email}`;
  fs.writeFileSync(`${name}.txt`,outputToWrite);
  const con =
    "Mango. Mangos are one of the most commonly consumed fruits in the world.";
  const params = {
    message: "form has been submitted successfully!",
    content: con,
  };
  res.status(200).render("index.pug", params);
});

app.listen(port, () => {
  console.log("application started successfully!");
});
