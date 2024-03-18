import { Request } from "../model/approval.model.js";
import { Product } from "../model/products.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const approval = asyncHandler(async (req, res) => {
    const { userId, productInfo } = req.body

    const verification = await User.findOne({ _id: userId })
    if (verification.isAdmin == true) {
        let updatedFields = {}


        if (productInfo.productName) {
            updatedFields["productName"] = productInfo.productName
        }
        if (productInfo.price) {
            updatedFields["price"] = productInfo.price
        }
        if (productInfo.image) {
            updatedFields["image"] = productInfo.image
        }
        if (productInfo.productDescription) {
            updatedFields["productDescription"] = productInfo.productDescription
        }

        await Product.updateOne({ "_id": productInfo.productId }, { $set: updatedFields })
        return res.json({
            message: "Changed as admin Successfully"
        })
    }
    if (verification && productInfo) {

        const particularUserRequests = await Request.find({ userId: userId })
        const uniqueRequestVerification = particularUserRequests.filter((item) => item.productInfo.isPending == true && item.productInfo.productId == productInfo.productId)

        if (uniqueRequestVerification.length) {
            return res.json({
                message: `Request yet to be approved till then modify other products`
            })
        }

        const newRequest = await Request.create({
            userId: userId,
            productInfo: {
                productId: productInfo.productId,
                changesForApproval: {
                    productName: productInfo.productName,
                    price: productInfo.price,
                    image: productInfo.image,
                    productDescription: productInfo.productDescription,
                },
                isPending: productInfo.isPending,
                isApproved: {
                    approved: productInfo.isApproved
                }
            }
        })



        return res.json({
            status: "Success",
            message: "Successfully sent for the approval",
        })
    } else {
        return res.json({
            status: 'Not authoroized',
            message: "you are not Authorized! to make changes"
        })
    }


})

export const requestData = asyncHandler(async (req, res) => {
    const { userId } = req.query
    
    if (userId) {
        const fetchParticularRequest = await Request.find({ userId: userId })

        const verifyAsAdmin = await User.findOne({_id: userId})

    if(verifyAsAdmin.isAdmin == true){
       const fetchAlltoApporove = await Request.find()
        return res.json({
            data: fetchAlltoApporove
        })
    }




        if (fetchParticularRequest.length) {
            return res.json({
                data: fetchParticularRequest
            })
        } else {
            return res.json({
                message: "no requests"
            })
        }
    }
    else {
        return res.json({
            message: "you are not Authorized!"
        })
    }
})

export const approveRequest = asyncHandler(async (req, res) => {
    const { adminId, isApproved, isPending, productId, memberId } = req.body

    const findUser = await User.findById({ _id: adminId })
    if (findUser.isAdmin == "false") {
        return res.json({
            status: "Not Authorized",
            message: "You are not Authorized to approve"
        })
    }
    if (adminId && productId && memberId) {


        // const uniqueRequestVerification = await Request.find({"userId" : memberId, "productInfo.productId": productId})
        // uniqueRequestVerification && uniqueRequestVerification.map((item) => item.productInfo.isApproved.approved === true )
        // console.log(isApproved)
        if (isApproved == true) {
            await Request.updateOne(
                { "userId": memberId, "productInfo.productId": productId, "productInfo.isApproved.approved": false, "productInfo.isPending": true },
                { $set: { "productInfo.isPending": isPending, "productInfo.isApproved.approved": isApproved, "productInfo.isApproved.approvedBy": adminId } }
            )
            const requestToUpdate = await Request.findOne({ "userId": memberId, "productInfo.productId": productId })
            let updatedFields = {}

            if (requestToUpdate.productInfo.changesForApproval.productName) {
                updatedFields["productName"] = requestToUpdate.productInfo.changesForApproval.productName
            }
            if (requestToUpdate.productInfo.changesForApproval.price) {
                updatedFields["price"] = requestToUpdate.productInfo.changesForApproval.price
            }
            if (requestToUpdate.productInfo.changesForApproval.image) {
                updatedFields["image"] = requestToUpdate.productInfo.changesForApproval.image
            }
            if (requestToUpdate.productInfo.changesForApproval.productDescription) {
                updatedFields["productDescription"] = requestToUpdate.productInfo.changesForApproval.productDescription
            }

            await Product.updateOne({ "_id": productId }, { $set: updatedFields })
            return res.json({
                message: "Approved Successfully"
            })
        }
        if (isApproved == false) {
            await Request.updateOne(
                { "userId": memberId, "productInfo.productId": productId, "productInfo.isApproved.approved": false, "productInfo.isPending": true },
                { $set: { "productInfo.isPending": isPending, "productInfo.isApproved.approved": isApproved, "productInfo.isApproved.approvedBy": adminId } }
            )
            res.json({
                message: "Rejected Successfully"
            })
        }

    }
})