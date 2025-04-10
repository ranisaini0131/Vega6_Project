export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(200).json({
                success: true,
                message: "Admin Verified !!"
            })
        }
    } catch (error) {
        console.log(error)
    }
}


