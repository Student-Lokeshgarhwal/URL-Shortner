// stateless auth
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY;

// statefull auth
// const sessionIdToUserMap = new Map();

// const setUser = (id, user)=>{
//     sessionIdToUserMap.set(id, user);
// }

// const getUser = (id)=>{
//    return sessionIdToUserMap.get(id);
// }

const setUser =(user)=>{
   return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role
    },secret)
}

const getUser = (token)=>{
    if(!token) return null;
    return jwt.verify(token,secret)
}

module.exports = {setUser,getUser}