import express from 'express'
import db from '../db/index.js';
import {usersTable, userSession} from '../db/schema.js'
import { eq } from 'drizzle-orm';
import {randomBytes,createHmac} from 'node:crypto'

const router = express.Router();

router.patch("/",async function (req,res) {
    const user = req.user;
    if(!user){
        return res.json({
            message:"User is not logged in!!"
        })
    }

    const {name} = req.body;
    await db.update(usersTable).set({name:name}).where(eq(usersTable.id,user.id))
    res.json({
        message:"name is updated"
    })
    
})

router.get("/",(req,res)=>{
    const user = req.user;
    if(!user){
        return res.json({
            message:"user is not logged in"
        })
    }

    return res.json({user})
}); // return current login wala user

router.post("/signup", async (req,res)=>{
    const {name, email,password} = req.body;
    const [existingUser] = await db
    .select({
        email: usersTable.email
    })
    .from(usersTable)
    .where((table) => eq(table.email,email));

    if(existingUser){
        return res.json({message:"User is already registered"})
    }
    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256',salt).update(password).digest('hex');

    const [user] = await db.insert(usersTable).values({
        name:name,
        email:email,
        password:hashedPassword,
        salt:salt
    }).returning({id:usersTable.id})

    return res.status(201).json({userID:user.id})
    
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const [existingUser] = await db
    .select({
        id: usersTable.id,
        email: usersTable.email,
        salt:usersTable.salt,
        password:usersTable.password
    })
    .from(usersTable)
    .where((table) => eq(table.email,email));
    if (!existingUser) {
        return res.status(404).json({ message: "User is not registered" });
    }

    const salt = existingUser.salt;
    const existingHash = existingUser.password
    const newHash = createHmac('sha256',salt).update(password).digest('hex');

    if (existingHash !== newHash) {
        return res.json({ error: "Incorrect password!!" });
    }

    const [session] = await db.insert(userSession).values({
        userID: existingUser.id
    }).returning({
        id:userSession.id
    })

    return res.json({ message: "User successfully logined", sessionID: session.id });
});

export default router;