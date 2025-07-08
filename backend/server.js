import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import cloudinaryConfig from "./cloudinaryConfig.js";
import morgan from "morgan";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
cloudinaryConfig();

const app = express();

app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(helmet());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, msg: 'Invalid JSON format in request body' });
  }
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));  // Logging for development
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.all('/{*any}', (req, res) => {
    // console.log("Serving index.html for route:", req.url);
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running in development mode.");
  });
}

app.get("/keep-alive", (req, res) => {
  res.send("Gateway backend running with import/export!");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });