import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongDB connected !! DB host  ${connectionInstances.connection.host}`, )
    } catch (error) {
        console.log('MongDB connectoin failed', error)
    }


}

export default connectDB