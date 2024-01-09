const express = require("express");

const { add, get, del, update } = require("../controller/book.js");

const routes = express.Router();

routes.post("/add", add);
routes.get("/get", get);
routes.delete("/del/:id", del);
routes.put("/update/:id", update);

module.exports = routes;
