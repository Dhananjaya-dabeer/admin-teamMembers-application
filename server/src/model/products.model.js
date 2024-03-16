import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type:[String]
    },
    productDescription: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
}, {timestamps:true})


export const Product = mongoose.model("Product", productSchema)