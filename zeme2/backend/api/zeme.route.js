import express from "express"
import ZemeCtrl from "./zeme.controller.js"

const router = express.Router()

router.route("/api/makeClass").get(ZemeCtrl.apiMakeClass)

router.route("/api/getClass").get(ZemeCtrl.apiGetClasses)

router.route("/api/class/meeting").get(ZemeCtrl.apiMakeMeeting)

router.route("/api/login").get(ZemeCtrl.apiCheckUser)

router.route("/api/update").get(ZemeCtrl.apiUpdateScores)

export default router