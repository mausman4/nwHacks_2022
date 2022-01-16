import express from "express"
import cors from "cors"
import zeme from "./api/zeme.route.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use("/", zeme)
app.use("*", (req, res) => res.status(404).json({error: "nothing found"}))

export default app