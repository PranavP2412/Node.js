import express from 'express'
import router from './routes/user.routes.js';

const PORT = process.env.PORT ?? 8000;

const app = express();
app.use(express.json())

app.use('/user',router)

app.listen(PORT,()=>{
    console.log("server running on post 8000");
})