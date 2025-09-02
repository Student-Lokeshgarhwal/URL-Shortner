const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const normalizedRole = role.toLowerCase();
    if (normalizedRole !== "admin" && normalizedRole !== "user") {
        return res.status(400).json({ error: "Role must be 'Admin' or 'User'" });
    }

    try {
        await User.create({ name, email, role, password });
        return res.status(200).json({ msg: "User Created Successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email, password });
    
    if (!user) {
         alert("User not found");
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
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None", // ✅ Required for cross-site cookies
});

    // send as json response
    

    // for mobile devices
    // res.json({token})  
    return res.status(200).json({msg:"Login Successful"});
}

module.exports = { handleUserSignUp, handleUserLogin }
