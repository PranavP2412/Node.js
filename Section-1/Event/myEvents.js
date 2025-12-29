const EventEmmiter = require('events')
const eventEmmiter = new EventEmmiter();

eventEmmiter.on('greet',(username)=>{
    console.log(`Hello ${username} from node js`);
})

eventEmmiter.emit('greet',"pranav");