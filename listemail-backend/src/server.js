import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import createDatabaseTables from "../src/model/createTables.js"

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser())



app.listen(process.env.PORT || 5000, () => {
    createDatabaseTables()
    console.log(`listening on port ${process.env.PORT || 5000}`);
});

