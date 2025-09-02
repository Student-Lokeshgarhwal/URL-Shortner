const { getUser } = require("../service/auth")

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;       // with cookies   

    // const authorizationHeaderValue = req.headers["authorization"];     // when send cookies as a header(in mobile apps) 
    req.user = null;                         
    // if(!authorizationHeaderValue || authorizationHeaderValue.startWith("Bearer")){return next()}
    if(!tokenCookie) return next();

    // const token = authorizationHeaderValue.split("Bearer ")[1];
    const userPayload = getUser(tokenCookie)             //from this line code will be common for both
    req.user = userPayload;
    return next();
}

// Authorization
function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user) return res.status(401).json({error:"You are not logged in!"})
            // console.log(req.user)
        if(!roles.includes(req.user.role)) return res.status(403).json({error:"You are not authorized to access this route!"})

        return next();
    }
}

module.exports = {checkForAuthentication,restrictTo}