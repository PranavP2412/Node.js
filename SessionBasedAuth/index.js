import express from 'express'
import router from './routes/user.routes.js';
import db from './db/index.js';
import { usersTable, userSession } from './db/schema.js';
import { eq, ne } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT ?? 8000;

const app = express();
app.use(express.json())

app.use(async function(req,res,next) {
    try {
        const tokenHeader = req.headers['authorization'] //it always registers header in small letters so take the values in small letters
    // authorization : Bearer <TOKEN>
    if(!tokenHeader){
        return next(); //always use return 
    }

    if(!tokenHeader.startsWith('Bearer')){
        return res.status(400).json({
            error:"authorization header must start with Bearer"
        })
    }

    const token = tokenHeader.split(' ')[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded;
    return next();
    
    } catch (error) {
        next()
    }
})

app.use('/user',router)

app.listen(PORT,()=>{
    console.log("server running on post 8000");
})