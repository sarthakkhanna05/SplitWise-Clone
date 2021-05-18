import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET)
        next();
    } catch (error) {
        res.status(401).send('Invalid Token');
    }
}