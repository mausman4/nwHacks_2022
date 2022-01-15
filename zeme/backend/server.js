import express from "express"
import cors from "cors"
import zeme from "./api/zeme.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(4004).json({error: "not found"}))

export default app