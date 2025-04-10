import { Router } from "express";
import { uploads } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/verifyUser.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { createComment, getAllComments } from "../controllers/comment.controller.js";

const router = Router()

router.post('/createComment', verifyJWT, createComment)

router.post("/getAllComment", verifyJWT, getAllComments)

export default router;

