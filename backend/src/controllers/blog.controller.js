import { Blog } from '../models/blog.model.js';



export const createBlog = async (req, res) => {
    try {

        //get user details from frontend
        const { title, description, image } = req.body

        console.log(req.files, "12")

        //validation
        if (!(title || description || image)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all fields",
            })
        }


        //check if user already exists or not
        const existedBlog = await Blog.findOne({ title })

        if (existedBlog) {
            return res.status(409).json({
                status: "failed",
                message: "Blog already exists"
            })
        }

        //extracting path
        const blogImagePath = req.files?.image[0]?.path
        console.log(blogImagePath, "blog image path")

        //create new blog

        const newBlog = new Blog({
            title,
            image: blogImagePath,
            description

        })
        await newBlog.save()


        if (!newBlog) {
            return res.status(500).json({
                status: 'error',
                message: "something went wrong while creating the blog"
            })
        }

        //return response
        return res.json({
            status: "success",
            message: "blog created successfully",
            newBlog
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllBlogs = async (req, res) => {
    try {

        const allBlog = await Blog.find()



        return res
            .status(200)
            .json({
                status: "success",
                product: allBlog
            })

    } catch (error) {

        return res
            .status(500)
            .json({
                status: "failed",
                mssage: "blog not found"
            })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params

        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true })

        return res
            .status(200)
            .json({
                status: "success",
                updatedProduct: blog
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                message: "blog not updated"
            })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params

        const blog = await Blog.findByIdAndDelete(id)

        return res
            .status(200)
            .json({
                status: "success",
                deletedProduct: blog
            })


    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                message: "blog not deleted"
            })
    }
}



