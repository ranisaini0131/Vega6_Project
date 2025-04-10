import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


export const signupUser = async (req, res) => {
    try {

        //get user details from frontend
        const { email, password, profileImage, role } = req.body

        //validation
        if (!(email || password || profileImage || role)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all fields",
            })
        }


        //check if user already exists or not
        const existedUser = await User.findOne(email)

        if (existedUser) {
            return res.status(409).json({
                status: "failed",
                message: "User already exists"
            })
        }

        //hash password
        // const hashedPassword = await bcrypt.hash(password, 10)


        //extracting path
        const profileImagePath = req.files?.profileImage[0]?.path

        //create new user

        const newUser = new User({
            email,
            password: hashedPassword,
            profileImage: profileImagePath,
            role

        })
        await newUser.save()


        //remove password and refresh token
        const createdUser = await User.findById(newUser._id).select(
            "-password"
        )

        if (!createdUser) {
            return res.status(500).json({
                status: 'error',
                message: "something went wrong while registering the user"
            })
        }

        //return response
        return res.json({
            status: "success",
            message: "User Signed up successfully",
            createdUser
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req, res) => {
    //get user entered data
    console.log(req.body)
    try {
        const { username, email, password } = req.body

        //check fields
        if (!(username || email)) {
            return res.status(422).json({
                status: "fail",
                message: "Please provide username or email"
            })
        }

        //check existed user
        const user = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "User does not exist"
            })
        }


        //validate passowrd
        const isPasswordValidate = await bcrypt.compare(password, user.password)
        if (!isPasswordValidate) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid user credentials",
                error: error.message
            })
        }


        //generate token
        const token = jwt.sign(
            {
                user: user,
                passowrd: req.body.passowrd
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )



        //response to user
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        //return response 
        return res
            .status(200)
            .json({
                status: 'success',
                data: {
                    user: loggedInUser,
                    token: token
                },
                message: "User Login Successfully"
            })

    } catch (error) {
        console.log("Error: ", error.message)
    }
}

