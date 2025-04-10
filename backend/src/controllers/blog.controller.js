import { Blog } from '../models/blog.model.js';



export const createBlog = async (req, res) => {
    try {
        const { title, description, image } = req.body;



        if (!(title && description && image)) {
            return res.status(500).json({
                status: "failed",
                message: "Please provide all required information",
            })
        }

        const existedPrduct = await Product.findOne({ title })

        if (existedPrduct) {
            return res
                .status(400)
                .json({
                    status: "failed",
                    message: "Blog already exists"
                })
        }

        const newBlog = new Blog(req.body);
        await newBlog.save()

        return res
            .status(201)
            .json({
                status: "failed",
                message: "Blog created Successfully",
                data: newBlog
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                status: "success",
                message: error.message
            })
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



