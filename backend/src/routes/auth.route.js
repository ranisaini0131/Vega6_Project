import { Router } from "express";
import { uploads } from "../middlewares/multer.middleware.js";
import { signupUser, loginUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js"

const router = Router()

router.post('/signup',
    uploads.fields([
        {
            name: "profileImage",
            maxCount: 1
        }
    ]),
    signupUser)

router.post("/login", verifyJWT, loginUser)

export default router;
