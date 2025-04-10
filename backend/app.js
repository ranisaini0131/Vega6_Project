import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({
    path: './env'
})

const port = 8000;
const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json({ limit: "160kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"))


// MongoDB connection URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/vega6db';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



// import routes
import userRouter from "./src/routes/auth.route.js"
import BlogRouter from "./src/routes/blog.routes.js"
import CommentRouter from "./src/routes/comments.route.js"

app.use('/api/users', userRouter)
app.use('/api/blog', BlogRouter)
app.use('/api/comments', CommentRouter)


app.listen(8000, (req, res) => {
    console.log(`Server is listening on port: ${port}`)
})


