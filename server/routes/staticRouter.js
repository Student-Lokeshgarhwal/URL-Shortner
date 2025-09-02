const express = require("express")
const URL = require("../models/url")
const { restrictTo } = require("../middlewares/auth")
const User = require("../models/user")

const router = express.Router()

router.get('/admin/urls',restrictTo(["Admin"]), async(req,res)=>{
   try{
     const allurls =await URL.find({})
    const allusers =await User.find({})
    return  res.status(200).json({allurls:allurls,allusers:allusers})
   }
   catch(err){
    return res.status(500).json({error:"Failed to fetch informations!"})
   }
})

router.get("/", restrictTo(["User", "Admin"]), async (req, res) => {
  try {
    const allurls = await URL.find({ createdBy: req.user._id })
    return res.status(200).json({ urls: allurls })
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch URLs" })
  }
})

module.exports=router;