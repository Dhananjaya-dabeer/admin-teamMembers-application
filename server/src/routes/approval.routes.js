import { Router } from "express";
import { approval, approveRequest, requestData } from "../controllers/approval.controllers.js";


const router = Router()

router.route('/modify').post(approval)
router.route('/requestdata').get(requestData)
router.route('/approvalRequest').patch(approveRequest)

export default router