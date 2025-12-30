const fs = require('fs')
exports.customMiddleware = function(req,res,next){
    const log = `\n [${Date.now()}] ${req.path} ${req.method}`;
    fs.appendFileSync('log.txt',log,'utf-8');
    next();
}