require('dotenv').config()

const serverMetrica = process.env.SERVER;
const db = process.env.DATABASE;
const userName = process.env.USERNAME;
const sessionId = process.env.SESSIONID;
const print2 = () =>{
    console.log(serverMetrica);
    console.log(db);
    console.log(userName);
    console.log(sessionId);
} 
function print(){
    console.log(serverMetrica);
    console.log(db);
    console.log(userName);
    console.log(sessionId);
}
module.exports = {
    print,
    print2
}
