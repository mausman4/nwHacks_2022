import express from "express"
import cors from "cors"
import zeme from "./api/zeme.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", zeme)
app.use("*", (req, res) => res.status(404).json({error: "nothing found"}))

export default app