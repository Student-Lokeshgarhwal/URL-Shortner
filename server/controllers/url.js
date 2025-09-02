const URL = require("../models/url")
const shortid = require("shortid")

async function handleGenerateNewShortUrl(req,res){
    const body = req.body
    if(!body.url){return res.status(400).json({err : "url is required"})}
    const shortID = shortid()
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id
    })
    return res.status(201).json({shortUrl:`${shortID}`})
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
   const result = await URL.findOne({shortId})
   console.log(result)
   return res.json({
    totalClicks:result.visitHistory.length,
    analytics:result.visitHistory,
   })
}

module.exports={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}
