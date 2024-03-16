
import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config()

connectDB().then(() => {
    try {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`server is running at Port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("MongoDB connection failed", error)
    }
})
