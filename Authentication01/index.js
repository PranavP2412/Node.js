import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.json())

const DAIRY = {};
const EMAILS = new Set();

app.post("/signup",(req,res)=>{
    const {name, email, password} = req.body;
    if (EMAILS.has(email)){
        return res.status(400).json({Error:"Email already exist"});
    }
    const token = `${Date.now()}`;
    DAIRY[token] = {name,email,password};
    EMAILS.add(email);
    console.log(DAIRY)

    return res.json({status:"Successfully registered!!",token:token});
})

app.post("/me",(req,res)=>{
    const {token} = req.body;
    if(!token){
        return res.status(400).json({error:"Token is not there"})
    }

    if(!(token in DAIRY)){
        return res.json({error:"Token is not valid"})
    }

    const entry = DAIRY[token];
    return res.json({data:entry});
})

app.listen(`${PORT}`,()=>{
    console.log("Web is running on port 8000");
})
