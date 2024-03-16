import { Router } from "express";
import {products} from "../controllers/product.controllers.js"

const router = Router()

router.route('/products').get(products)


export default router