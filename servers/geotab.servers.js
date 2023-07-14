require('dotenv').config()
const { response } = require('express');
const GeotabApi = require('mg-api-js');


const serverMetrica = process.env.SERVER;
const db = process.env.DATABASE;
const userName = process.env.USER_NAME;
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

async function users(){    
    const authentication = {
        
        credentials: {
            database: db,
            userName: userName,
            password: 'Ron103xD.'
        },
        path: serverMetrica
        }
   // const api = new GeotabApi(authentication);
    print();
    const api = new GeotabApi(authentication);

    await api.authenticate().then( response => console.log('I have authenticated',response),);
}



async function devices(){
    const authentication = {
    
    credentials: {
        database: db,
        userName: userName,
        password: 'Ron103xD.',
        sessionId: null
    },
    path: serverMetrica
    }

    const api = new GeotabApi(authentication);
    let myCall = api.call('Get', {
    typeName: 'Device',
    resultsLimit: 1
});

    myCall.then( data => console.log(`Server response data: ${data}`,data)).
    catch( error => console.log(error));
}
async function deviceStatusInfo(){
    const authentication = {
    
    credentials: {
        database: db,
        userName: userName,
        password: 'Ron103xD.',
        sessionId: null
    },
    path: serverMetrica
    }

    const api = new GeotabApi(authentication);
    let myCall = api.call('Get', {
    typeName: 'Device',
    resultsLimit: 1
});

    myCall.then( data => console.log(`Server response data: ${data}`,data)).
    catch( error => console.log(error));
}

module.exports = {
    print,
    print2,
    users,
    devices,
    deviceStatusInfo
}
