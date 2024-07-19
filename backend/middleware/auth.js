const jwt = require('jsonwebtoken');



const verifyToken = async (req, res, next) => {

    try {

        let token = null;
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(403).json({
                message: 'A token is required for authentication'
            });
        }
        const decodedToken = await jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        req.headers.userId = decodedToken.id;

    } catch (err) {
        return res.status(401).json(err);
    }

    return next();

};

module.exports = verifyToken;