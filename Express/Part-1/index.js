const express = require("express")

const app = express()

app.get("/",(req,res)=>{
    res.send("YOU ARE AT HOME")
})

app.get("/contact",(req,res)=>{
    res.send("contact please")
})

app.listen("8000",()=>{
    console.log("server is running of port 8000.")
})