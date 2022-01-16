import express from "express"
import ZemeCtrl from "./zeme.controller.js"

const router = express.Router()

router.route("/api/vi/classes").get(ZemeCtrl.apiGetClasses)

router.route("/classes").get(ZemeCtrl.apiGetClasses)


router.route("/signup").get((req, res) => res.send("GIVE USERNAME"))
export default router