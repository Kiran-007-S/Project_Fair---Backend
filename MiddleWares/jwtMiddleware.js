// // jwt middle is router specific, so dont need give pfServer .use ("jwtrouter")

const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt middleware");
    //token verification
    //get the token from req header

    const token=req.headers['authorization']?.slice(7)
    console.log(token);
    //verify the token
    try{
        const tokenverfication = jwt.verify(token,"superkey2024")
        console.log(tokenverfication);
        req.payload=tokenverfication.userId
        next()
    }
    catch(err){
        res.status(401).json("Authorization failed... Please login again...")
    }
}

module.exports = jwtMiddleware