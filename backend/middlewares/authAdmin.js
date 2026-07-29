import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Unified header: same 'token' key as user and doctor
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Role guard: must be 'admin' role AND matching admin email
        if (token_decode.role !== 'admin' || token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: 'Access denied. Invalid role.' });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

export default authAdmin;