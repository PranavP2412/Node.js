const http = requirea('http');

const server = http.createServer();

server.listen(8000,()=>{
    console.log("server is running on port 8000")
})

