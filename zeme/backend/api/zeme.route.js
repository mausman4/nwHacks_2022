import express from "express"
import ZemeCtrl from "./zeme.controller.js"

const router = express.Router()

router.route("/api/class").get(ZemeCtrl.apiGetClasses)

router.route("/api/class/meeting").get(ZemeCtrl.apiMakeMeeting)



export default router