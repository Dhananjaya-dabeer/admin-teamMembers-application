import { Product } from "../model/products.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const products = asyncHandler(async (req, res) => {
        const productInfo = await Product.find()
        res.json({
            status: "Success",
            data: productInfo
        })
   
})

