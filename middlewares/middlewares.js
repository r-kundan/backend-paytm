import jwt from  "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWTTOKEN_SECRET);

if(decoded.userId){
    req.userId = decoded.userId;
    next();
}
else{
    return res.status(404).json({})
}
    } catch (err) {
        return res.status(403).json({});
    }
};


export default authMiddleware
// module.exports = {
//     authMiddleware
// }