import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json({ limit: "160kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"))



// import routes
import userRouter from "./src/routes/auth.route.js"
import BlogRouter from "./routes/blog.route.js"
import CommentRouter from "./routes/comments.route.js"

app.use('/api/users', userRouter)
app.use('/api/blog', BlogRouter)
app.use('/api/comments', CommentRouter)









export { app }
