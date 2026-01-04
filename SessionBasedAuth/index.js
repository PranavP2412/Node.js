import express from 'express'
import router from './routes/user.routes.js';
import db from './db/index.js';
import { usersTable, userSession } from './db/schema.js';
import { eq, ne } from 'drizzle-orm';

const PORT = process.env.PORT ?? 8000;

const app = express();
app.use(express.json())

app.use(async function(req,res,next) {
    const sessionID = req.headers['sessionid']
    if(!sessionID){
        return next();
    }
    const [data] = await db.select({
        sessionID:userSession.id,
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email
    }).from(userSession).rightJoin(usersTable, eq(userSession.userID,usersTable.id)).where(eq(userSession.id, sessionID));

    if(!data){
        return next();
    }

    req.user = data;
    return next();
    
})

app.use('/user',router)

app.listen(PORT,()=>{
    console.log("server running on post 8000");
})