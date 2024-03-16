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
                type: String,
                required: true
            },
            changesForApproval: {
                type: {
                    price: {
                        type: String,
                        required: true
                    },
                    image: {
                        type: [String],
                        required: true
                    },
                    ProductDescription: {
                        type: String,
                        required: true
                    },
                    _id: {
                        type: String,
                        required: true
                    }
                },
                required: true

            },
            isPending: {
                type: Boolean,
                required: true
            },
            isApproved: {
                type: Boolean,
                required: true
            }
        },
        required: true
    }
}, { timestamps: true })