import express from "express";
import { generateNotesController } from "../controllers/ollamaController.js";

const router = express.Router();

router.post("/generate", generateNotesController);

export default router;