import express from "express"
import ZemeCtrl from "./zeme.controller.js"

const router = express.Router()

router.route("/api").get(ZemeCtrl.apiGetClasses)


export default router