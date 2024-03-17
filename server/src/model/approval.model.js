import mongoose from "mongoose";

const ApprovalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productInfo: {
        type: {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            changesForApproval: {
                type: {
                    productName: {
                        type: String,
                        required: true
                    },
                    price: {
                        type: String,
                        required: true
                    },
                    image: {
                        type: [String],
                        required: true
                    },
                    productDescription: {
                        type: String,
                        required: true
                    },
                },
                required: true

            },
            isPending: {
                type: Boolean,
                required: true
            },
            isApproved: {
                type: {
                    approvedBy: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                    approved:{
                        type: Boolean,
                        required: true
                    }
                },
                required: true
            }
        },
        required: true
    }
}, { timestamps: true })

export const Request = mongoose.model("Request", ApprovalSchema)