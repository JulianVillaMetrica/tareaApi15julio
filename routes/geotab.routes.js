const geoTabServers = require('../servers/geotab.servers')
const router = require("express").Router()

const fs = require("fs");

const dataPath = "./usuarios.txt"; // path a nuestro JSON 

// declaracion de funciones
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return jsonData;
};

//se cambio a asincrona para poder usar await 
router.get("/api/user", async (req, res) => {
    /*
    let prueba = geoTabServers.users();
   // var accounts = getAccountData();
    console.log('consola de routes',prueba)
    res.send(prueba);
*/
    //se uso el await para que primero se ejecutara la funcion de users y despues de eso ahora si mandara el la respuesta al body
    try {
    let usersAuth = await geoTabServers.users();
   // res.send(usersAuth);
   // res.send({ "Autentificación de credenciales: \n": usersAuth });
    res.send({ "Autentificación de credenciales:    ": usersAuth });
    //res.send('p')
    } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
    }
});

router.get("/api/devices", async (req, res) => {
    /*
    geoTabServers.devices();
    res.json();
    */
    //se uso el await para que primero se ejecutara la funcion de users y despues de eso ahora si mandara el la respuesta al body
    try {
    let geoDevices = await geoTabServers.devices();
    res.send({ "Dispositivo:    ": geoDevices });
    } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
    }

});
router.get("/api/deviceStatusInfo", async (req, res) => {
    /* 
    geoTabServers.deviceStatusInfo();
    res.json();
    */
    try {
    let deviceStatusInfoData = await geoTabServers.deviceStatusInfo();
    res.send({ "Informacion del estado del dispositivo:    ": deviceStatusInfoData });
    } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
    }
});

module.exports = router;