import express from "express";

import {
  getOtherUsers,
  getUsers,
  updateUserData,
} from "../../controllers/auth/user.controller.js";
import { verifyTokenAndRole } from "../../middlewares/auth.js";
import upload from "../../middlewares/file_uploder.js";

const routes = express.Router();

routes.get("/get/userid/:uid", getUsers);

routes.get("/get/other", getOtherUsers);

routes.put(
  "/update/",
  verifyTokenAndRole(['user', "admin"]),
  upload.single("picPath"),
  updateUserData
);

export default routes;
