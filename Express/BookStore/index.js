const express = require('express')
const fs = require('fs')
const bookRouter = require('./routes/book.routes')

const app = express()
const Port = 8000;



app.use(express.json())

app.use('/book',bookRouter);


app.listen(Port,()=>{
    console.log(`Port is running on ${Port}`)
})

