const booksTable = require('../models/book.model')
const db = require('../db/index')
const {eq} = require('drizzle-orm')


exports.getAllBooks = async function(req,res){
    const result = await db.select().from(booksTable)
    return res.json(result)
}

exports.getBooksByID = async function (req,res){
    const id = req.params.id;
    const [book] = db.select().from(booksTable).where((table) => eq(table.id,id) ).limit(1); 
    if(!response){
        res.status(404).send("No book available with this id")
    }else{
        res.send(response);
    }
}

exports.enterBook = async function (req,res){
    const {title,description,authorID} = req.body;
    if(!title){
        return res.status(400).send("something is missing in the data")
    }
    const [result] = await db.insert().values({
        title,
        description,
        authorID
    }).returning({
        id: booksTable.id
    })
    return res.status(201).json({
        message:"book created",
        id:result.id
    })
}

exports.deleteBookByID = async function (req,res){
    const id = req.params.id
    const result =  await db.delete(booksTable).where(eq(booksTable.id,id)).returning({
        id:booksTable.id
    })
    res.status(200).json({
        message:"Book deleted"
    })
}