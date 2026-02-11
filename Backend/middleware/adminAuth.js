import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        const adminIdentifier = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

        if (token_decode !== adminIdentifier) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }
        
        next();

    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ success: false, message: "Session expired or invalid token. Please login again." });
    }
}

export default adminAuth;