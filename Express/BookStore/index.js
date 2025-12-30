const express = require('express')
const fs = require('fs')

const app = express()
const Port = 8000;


function customMiddleware(req,res,next){
    const log = `\n [${Date.now()}] ${req.path} ${req.method}`;
    fs.appendFileSync('log.txt',log,'utf-8');
    next();
}

app.use(express.json())



const books = [
    { id:1, title:"Book1", author:"author1" },
    { id:2, title:"Book2", author:"author2" }
]

app.get("/book",(req,res)=>{
    res.json(books)
})

app.get("/book/:id",customMiddleware,(req,res)=>{
    const id = parseInt(req.params.id);
    const response = books.find((e) => e.id === id)
    if(!response){
        res.status(404).send("No book available with this id")
    }else{
        res.send(response);
    }
})

app.post("/book",(req,res)=>{
    const {id,title,author} = req.body;
    if(!title || !author){
        return res.status(400).send("something is missing in the data")
    }
    books.push({id:id, title:title, author:author})
    res.send(books)
})

app.delete("/book/:id",(req,res)=>{
    const id = req.params.id
    books.splice(id,1)
    res.send(books)
})

app.listen(Port,()=>{
    console.log(`Port is running on ${Port}`)
})

