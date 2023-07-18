require('dotenv').config()
const { response } = require('express');
const GeotabApi = require('mg-api-js');
const fs = require("fs");

const serverMetrica = process.env.SERVER;
const db = process.env.DATABASE;
const userName = process.env.USER_NAME;
const sessionId = process.env.SESSIONID;
const passwordEnv = process.env.PASSWORD;


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
    console.log(passwordEnv)
}

async function users(){    
    const authentication = {
        
        credentials: {
            database: db,
            userName: userName,
            password: passwordEnv
        },
        path: serverMetrica
        }
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
    resultsLimit: 5
    });
/*
    myCall.then( data => console.log(`Server response data: ${data}`,data)).
    catch( error => console.log(error));
*/
    await myCall.then( data => { 
    console.log(`Server response data: ${data}`,data)
    deviceData = data;
    }).
    catch( error => console.log(error));
    return deviceData;
}
async function deviceStatusInfo(){
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
    resultsLimit: 5
    });
    /*
    myCall.then( data => console.log(`Server response data: ${data}`,data)).
    catch( error => console.log(error));
    */
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
