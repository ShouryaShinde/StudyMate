import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import notesRoutes from "./routes/routes.js";

const app = express();

app.use(
    cors({
    origin: process.env.CLIENT_URL,
    }),
);

app.use(json());

app.get("/", (req, res) => {
  res.json({
    message: "StudyMate API is running",
  });
});

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
