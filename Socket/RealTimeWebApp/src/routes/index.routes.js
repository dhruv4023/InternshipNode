import express from 'express';
import user_api from "./auth/index.js"
import chat_api from "./chat/index.js"

const router = express.Router();

router.use("", user_api)
router.use("", chat_api)

export default router;
