import express, { type Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/database";
import authRoutes from "./routes/route";

dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

export function startServer() {
  return app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
  });
}

startServer();
