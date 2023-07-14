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

/*
//*-----------------------------------------------------delete viejo
// delete - segun el id actualmente
accountRoutes.delete("/account/delete/:id", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
            var existAccounts = getAccountData();
            const userId = req.params["id"];
            delete existAccounts[userId];
            saveAccountData(existAccounts);
            res.send(existAccounts)
       //     res.send(`La cuenta : ${userId} se ha borrado`);
            
        }, true);
});*/
//*-----------------------------------------------------delete
// delete - segun el id actualmente
accountRoutes.delete("/account/delete/:email", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send("Internal server error");
            return;
        }

        var existAccounts = getAccountData();
        const userCorreo = req.params["email"];

        console.log("Requested email:", userCorreo);

        let matchingId = null;
        for (const [userId, userData] of Object.entries(existAccounts)) {
            console.log("Checking user:", userId, userData);
            if (userData.email === userCorreo) {
                matchingId = userId;
                break;
            }
        }

        console.log("Matching ID:", matchingId);

        // Delete the user's data
        if (matchingId) {
            delete existAccounts[matchingId];
            saveAccountData(existAccounts);
            console.log("User data deleted successfully.");
            res.send(existAccounts);
        } else {
            console.log("User not found.");
            res.status(404).send("User not found");
        }
//-------------------------------------------



            /*
            var count = Object.keys(existAccounts).length;
            for (let i = 0; i < count; i++){
                const element = array[i];
                if(userCorreo==existAccounts.email)   
                    delete existAccounts[userId];
            }
            //const userId = req.params["id"];
            delete existAccounts[userId];
            saveAccountData(existAccounts);
            res.send(existAccounts)
       //     res.send(`La cuenta : ${userId} se ha borrado`);
            */
        }, true);
});
module.exports = accountRoutes;
