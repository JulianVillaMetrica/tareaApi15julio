const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");

const dataPath = "./Details/account.json"; // path a nuestro JSON 

// declaracion de funciones
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};


//*---------------------------------------------------------POST
//post:recibe los datos de un usuario en un json  y le de una id 
accountRoutes.post("/api/devTeam/add", (req, res) => {
    var existAccounts = getAccountData();
    const newAccountId = Math.floor(100000 + Math.random() * 900000);

    existAccounts[newAccountId] = req.body;

  //  console.log(existAccounts);
    saveAccountData(existAccounts);
    res.send(existAccounts);
});

//*---------------------------------------------------------GET
// get: obtiene todos los usuarios
accountRoutes.get("/api/devTeam", (req, res) => {
    const accounts = getAccountData();
    res.send(accounts);
});


//*-----------------------------------------------------delete
// delete - segun el correo
accountRoutes.delete("/api/devTeam/delete/:email", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send("Internal server error");
            return;
        }
        var existAccounts = getAccountData();
        const userCorreo = req.params["email"];

        console.log("email a borrar:", userCorreo);

        let matchingId = null;
        for (const [userId, userData] of Object.entries(existAccounts)) {
            console.log("Checking user:", userId, userData);
            if (userData.email === userCorreo) {
                matchingId = userId;
                break;
            }
        }

        console.log("Matching ID:", matchingId);

        //Si hay una ID que hizo match entra al condicional
        if (matchingId) {
            delete existAccounts[matchingId];
            saveAccountData(existAccounts);
            console.log("Usuario borrado exitosamente.");
            res.send(existAccounts);
        } else {
            console.log("Usuario no encontrado.");
            res.status(404).send("Usuario no encontrado");
        }
        }, true);
});
module.exports = accountRoutes;
