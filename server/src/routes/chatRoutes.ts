const { Router } = require("express");
const chatControllers = require("../controllers/chatsControllers");
const authMiddleware = require("../middlewares/authorize");

const router = Router();

router.get("/", authMiddleware.authorizeToken, chatControllers.getChats);

router.post(
  "/new-chat",
  authMiddleware.authorizeToken,
  chatControllers.addChat
);

module.exports = router;
export {};
