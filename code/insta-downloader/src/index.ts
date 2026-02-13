import express, { urlencoded } from 'express'
import downloadReel from './download.js';
import path from 'node:path';
import fs from 'fs'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.json({
        "message":"working"
    })
})

app.post("/download/reel",(req,res)=>{
    const {url} = req.body
    downloadReel(url)

    res.status(200).json({
        "message":"Done",
        url
    })
})
app.get("/get_media",(req, res)=>{
    const filePath = req.query.url
    if (!filePath) {
        return res.status(400).json({ error: "Filename is required" });
    }
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }
    const data = path.resolve(url)
    res.json({
        message:"true",
        url
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})



