import express, { Request, Response, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "./config/corsOption.js";
import { credentials } from "./middleware/credentials.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { apiRouter } from "./routes/peoples.js";
dotenv.config();

const app: Express = express();

app.use(credentials);
app.use(cors(corsOptions));
// app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/api/peoples", apiRouter);

app.get("/", (req, res) => {
  res.send("works12345");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
