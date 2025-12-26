import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./utilis/db.js";
import userroute from "./routes/user.route.js";
import companyroute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationroute from "./routes/application.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/home", (req, res) => {
  res.status(200).json({
    message: "I am from backend",
    success: true,
  });
});

app.use("/api/v1/user", userroute);
app.use("/api/v1/company", companyroute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationroute);


app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  connectdb();
  console.log(`Server is running on port ${port}`);
});
