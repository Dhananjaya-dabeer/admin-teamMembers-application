import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const health = asyncHandler(async (req, res) => {
    res.status(200).json({
        status: `server is up and running`
    })
})

export const signin = asyncHandler(async (req, res) => {
    const { email, password, isAdmin } = req.body
    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const isPassworCorrect = await existingUser.isPassworCorrect(password)
            if (isPassworCorrect) {
                const token = await existingUser.generateAccessToken()
                return res.status(200).json({
                    admin: existingUser.isAdmin ? true : false,
                    token: token,
                    id: existingUser._id
                })

            }
            else {
                return res.json({
                    status: "Failed",
                    message: "either password or email is wrong!"
                })
            }
        } else {
            const newuser = await User.create({ email, password, isAdmin })
            const token = await newuser.generateAccessToken()
            return res.status(200).json({
                admin: newuser.isAdmin ? true : false,
                token: token,
                id: newuser._id
            })

        }
    } catch (error) {
        console.log('Fetch error', error)
    }

})