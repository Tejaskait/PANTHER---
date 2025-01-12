import jwt from "jsonwebtoken";
import client from "../services/redis.service.js";

 const authuser = async (req, res,next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: "Not authorized, token is missing" });
        }
        const isBlocked= await client.get(token)

        if(isBlocked){
            res.cookie('token','')
            return res.status(401).json({ error: "Your account has been blocked. Please contact support." });
        }
        const verify_token = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify_token
        ;
        next()
        
    } catch (error) {
        res.status(401).json({ error: "Not authorized, token is missing or invalid" });
        
    }
}

export default authuser;