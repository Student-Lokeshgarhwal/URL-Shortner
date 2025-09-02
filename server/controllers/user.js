const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
    console.log(req.body)
    const { name, email, role, password } = req.body

    if (!name || !email || !role || !password) return res.redirect('/signup')

    const setRole = role.toLowerCase()    //User

    if (setRole != "admin" && setRole != "user") return res.redirect('/signup')

    if (role === "admin" || role=== "user") return res.render('signup',{
        err:"role must start with capital letter!"
    })

    await User.create({
        name,
        email,
        role,
        password
    })

    // return res.render('home')     //when render, only page display but not refreshed page.   
    return res.status(200).json({msg:"User Created Successfully!"})        //when redirect,page display by get request

}

async function handleUserLogin(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email, password });
    
    if (!user) {
         console.log("User not found");
         return res.status(401).json({msg:"Invalid email or password"});
    
    }
    //      return res.render("login", {
    //     // error: "Wrong Email or Password!"
    // })

    // statefull auth
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);

    // stateless auth
    const token = setUser(user);   //jwt token
    res.cookie("token", token);
    // send as json response
    

    // for mobile devices
    // res.json({token})  
    return res.status(200).json({msg:"Login Successful"});
}

module.exports = { handleUserSignUp, handleUserLogin }
