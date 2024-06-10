import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import createDatabaseTables from "./model/createTables.js";
import { router } from "./routes/router.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173/",
  methods: "GET, POST",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use("/", router);

app.listen(process.env.PORT || 5000, () => {
  createDatabaseTables();
  console.log(`listening on port ${process.env.PORT || 5000}`);
});
