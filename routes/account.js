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
accountRoutes.post("/account/addaccount", (req, res) => {
    var existAccounts = getAccountData();
    const newAccountId = Math.floor(100000 + Math.random() * 900000);

    existAccounts[newAccountId] = req.body;

  //  console.log(existAccounts);
    saveAccountData(existAccounts);
    res.send(existAccounts);
});

//*---------------------------------------------------------GET
// get: obtiene todos los usuarios
accountRoutes.get("/account/list", (req, res) => {
    const accounts = getAccountData();
    res.send(accounts);
});


//*-----------------------------------------------------delete
// delete - segun el id actualmente
accountRoutes.delete("/account/delete/:id", (req, res) => {
    fs.readFile(
        dataPath,
        "utf8",
        (err, data) => {
            var existAccounts = getAccountData();
            const userId = req.params["id"];
            delete existAccounts[userId];
            saveAccountData(existAccounts);
            res.send(existAccounts)
       //     res.send(`La cuenta : ${userId} se ha borrado`);
            
        },
        true
    );
});

module.exports = accountRoutes;
