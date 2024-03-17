import express, { urlencoded } from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// route Import
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import approvalRouter from "./routes/approval.routes.js"
// route declaration
app.use('/api/v1/users', userRouter)
app.use('/api/v2/products/data', productRouter)
app.use('/api/v3/approval', approvalRouter)


export default app