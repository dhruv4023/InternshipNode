import express from "express";
import {
  registerControl,
  loginControl,
  getUserNames,
  changePassControl,
} from "../../controllers/auth/auth.controller.js";
import { verifyTokenAndRole } from "../../middlewares/auth.js";
import upload from "../../middlewares/file_uploder.js";

const routes = express.Router();

routes.post("/register", upload.single("picPath"), registerControl);

routes.post("/login", loginControl);

routes.put("/change/password", verifyTokenAndRole(['user', "admin"]), changePassControl);

routes.get("/get/usernames", getUserNames);

export default routes;
