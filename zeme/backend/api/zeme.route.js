import express from "express"

const router = express.Router()

router.route("/").get((req, res) => res.send("hello world"))


router.route("/signup").get((req, res) => res.send("GIVE USERNAME"))
export default router