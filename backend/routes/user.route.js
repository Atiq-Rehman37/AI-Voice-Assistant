import express from "express";
import {
  currentUser,
  updateAssistant,
  askToAssistant,
} from "../controller/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/current", isAuth, currentUser);
router.post(
  "/updateAssistant",
  isAuth,
  upload.single("assistantImage"),
  updateAssistant,
);
router.post("/asktoassistant", askToAssistant);

export default router;
