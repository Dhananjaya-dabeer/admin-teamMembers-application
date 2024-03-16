import { Router } from "express"
import { health, signin } from "../controllers/user.controllers.js"


const router = Router()

router.route('/health').get(health)
router.route('/signin').post(signin)



export default router