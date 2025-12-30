const {books} = require('../models/books')

exports.getAllBooks = function(req,res){
    res.json(books);
}

exports.getBooksByID = function (req,res){
    const id = parseInt(req.params.id);
    const response = books.find((e) => e.id === id)
    if(!response){
        res.status(404).send("No book available with this id")
    }else{
        res.send(response);
    }
}

exports.enterBook = function (req,res){
    const {id,title,author} = req.body;
    if(!title || !author){
        return res.status(400).send("something is missing in the data")
    }
    books.push({id:id, title:title, author:author})
    res.send(books)
}

exports.deleteBookByID = function (req,res){
    const id = req.params.id
    books.splice(id,1)
    res.send(books)
}