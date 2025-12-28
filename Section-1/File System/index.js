const fs = require('fs')

// const content = fs.readFileSync('notes.txt','utf-8')

console.log('start')
fs.readFile('notes.txt','utf-8',function(erorr,data){
    if(erorr){
        console.log(erorr)
    }else{
        console.log('content = ',data)
    }
})

console.log('end')