import { Router } from "express"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { verifyJWT } from "../middlewares/verifyUser.middleware.js"
import { uploads } from "../middlewares/multer.middleware.js"
import { createBlog, getAllBlog, updateBlog, deleteBlog } from "../controllers/product.controller.js"

const router = Router()

router.post("/createBlog", verifyJWT, isAdmin, uploads.array("avatar", 10), createBlog)

router.get("/getAllBlog", verifyJWT, isAdmin, getAllBlog)

router.patch("/updatedBlog/:id", verifyJWT, isAdmin, updateBlog)

router.delete("/deleteProduct/:id", verifyJWT, isAdmin, deleteBlog)



export default router;