import jwt from 'jsonwebtoken';

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization token missing.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // only doctor allowed
        if (decoded.role !== 'doctor') {
            return res.status(403).json({ success: false, message: 'Access denied. Invalid role.' });
        }

        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.error('Auth Error:', error.message);
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

export default authDoctor;
