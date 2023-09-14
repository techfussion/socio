import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if(!token){
            return(res.status(403).send("Access Denied"));
        };

        if(token.startsWith("Bearer ")) {
            token = token.toString().slice(7, token.length).trimStart();
        }
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ msg: "error from jwt middleware" , error: err.message });
    }
};