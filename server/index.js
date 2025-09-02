const express = require("express")
const path = require("path")
const cookieparser = require("cookie-parser")

const { connectDb } = require("./connect");
const URL = require("./models/url")

const URLRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const { checkForAuthentication,restrictTo } = require("./middlewares/auth");
const cors = require('cors')


const app = express();
const PORT = 8001;

app.use(cors({
    origin: ' http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthentication);

connectDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("mongodb connected!"))

    app.use("/user",userRouter)
app.use("/url",restrictTo(["User","Admin"]), URLRoute)

app.get('/url/:shortId', async (req, res) => {
    console.log( req.params.shortId)
    const entry = await URL.findOne({ shortId: req.params.shortId });
    if (!entry) {
        return res.status(404).json({ error: 'Short ID not found' });
    }
    // 200 OK with JSON body
    return res.status(200).json({ redirectURL: entry.redirectURL });

});
app.use("/", staticRoute)
app.listen(PORT, () => { console.log("Server Started") })