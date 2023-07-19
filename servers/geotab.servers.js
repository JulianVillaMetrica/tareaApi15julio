require('dotenv').config()
require('express');
const GeotabApi = require('mg-api-js');
const fs = require("fs");

const serverMetrica = process.env.SERVER;
const db = process.env.DATABASE;
const userName = process.env.USER_NAME;
const sesId = process.env.SESSIONID;
const passwordEnv = process.env.PASSWORD;


const print2 = () =>{
    console.log(serverMetrica);
    console.log(db);
    console.log(userName);
    console.log(sesId);
} 
function print(){
    console.log(serverMetrica);
    console.log(db);
    console.log(userName);
    console.log(sesId);
    console.log(passwordEnv)
}

async function users(){    
    /* const authentication = {
        
        credentials: {
            database: db,
            userName: userName,
            password: passwordEnv
        },
        path: serverMetrica
        }*/
        
    const authentication = {
        
        credentials: {
            database: db,
            userName: userName,
            sessionId: sesId,
            password: passwordEnv
        },
        path: serverMetrica
        }
        print();
    const api = new GeotabApi(authentication);

   // await api.authenticate().then( response => console.log('I have authenticated',response));
    await api.authenticate().then(response => {
    console.log('I have authenticated', response);
    authenticatedResponse = response;
    });
    //console.log(authenticatedResponse)
    return authenticatedResponse;
}
/*
//! ESTO NO FUE LO QUE SE PIDIO, SOLO LO HICE PARA PROBAR EL COMO REGRESAR LOS VALORES EN UN TEXTO, USAR LA FUNCION "users" DE ARRIBA QUE SOLO ES PARA AUTENTIFICARTE 
async function users() {
    const authentication = {
        credentials: {
            database: db,
            userName: userName,
            password: passwordEnv
        },
        path: serverMetrica
    };
    const api = new GeotabApi(authentication);
    try {
        const response = await api.authenticate();
        console.log('I have authenticated', response);

        // Obtener la información de los usuarios
        const usersData = await api.call('Get', {
            typeName: 'User'
        });

        // Crear un texto con la información de los usuarios
        let usersText = 'Usuarios:\n';
        usersData.forEach(user => {
            usersText += `Email: ${user.name}\n`;
        });

        // Escribir el texto en un archivo llamado "usuarios.txt"
        fs.writeFile('usuarios.txt', usersText, (err) => {
            if (err) throw err;
            console.log('La información de los usuarios se ha escrito en usuarios.txt');
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
*/
async function devices(){
    const authentication = {
    
    credentials: {
        database: db,
        userName: userName,
        password: passwordEnv,
        sessionId: null
    },
    path: serverMetrica
    }

    const api = new GeotabApi(authentication);
    let myCall = api.call('Get', {
    typeName: 'Device',
    resultsLimit: 1
    });
/*
    myCall.then( data => console.log(`Server response data: ${data}`,data)).
    catch( error => console.log(error));
*/
    let deviceData;
    await myCall.then( data => { 
    console.log(`Server response data: ${data}`,data)
    deviceData = data;
    }).
    catch( error => console.log(error));
    return deviceData;
}
async function deviceStatusInfo(id){
    const authentication = {
    
    credentials: {
        database: db,
        userName: userName,
        password: passwordEnv,
        sessionId: null
    },
    path: serverMetrica
    }

    const api = new GeotabApi(authentication);
    let myCall = api.call('Get', {
    typeName: 'DeviceStatusInfo',
    "search" : {
    "deviceSearch" : {
        "id" : id
    }
    },
    resultsLimit: 1
    });
    console.log(id)
    /*
    myCall.then( data => console.log(`Server response data: ${data}`,data)).
    catch( error => console.log(error));
    */
    let deviceStatusInfoData;
    await myCall.then( data => { 
    console.log(`Server response data: ${data}`,data)
    deviceStatusInfoData = data;
    }).
    catch( error => console.log(error));
    return deviceStatusInfoData;
    
}

module.exports = {
    print,
    print2,
    users,
    devices,
    deviceStatusInfo
}
