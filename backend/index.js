import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import gemini_response from "./gimini.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//auth route middleware
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", async (req, res) => {
  try {
    let prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await gemini_response(prompt);

    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
