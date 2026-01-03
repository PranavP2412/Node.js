import express from 'express'
import db from '../db/index.js';
import {usersTable} from '../db/schema.js'
import { eq } from 'drizzle-orm';
import {randomBytes,createHmac} from 'node:crypto'

const router = express.Router();

router.get("/"); // return current login wala user

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

    return res.json({ message: "User successfully logined" });
});

export default router;