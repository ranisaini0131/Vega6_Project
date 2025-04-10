import { Router } from "express"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { verifyJWT } from "../middlewares/verifyUser.middleware.js"
import { uploads } from "../middlewares/multer.middleware.js"
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from "../controllers/blog.controller.js"

const router = Router()

router.post("/createBlog", verifyJWT, isAdmin, uploads.array("image", 10), createBlog)

router.get("/getAllBlog", verifyJWT, isAdmin, getAllBlogs)

router.patch("/updatedBlog/:id", verifyJWT, isAdmin, updateBlog)

router.delete("/deleteProduct/:id", verifyJWT, isAdmin, deleteBlog)



export default router;