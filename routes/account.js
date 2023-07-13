const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");

const dataPath = "./Details/account.json"; // path to our JSON file

// util functions
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

accountRoutes.post("/account/addaccount", (req, res) => {
    var existAccounts = getAccountData();
    const newAccountId = Math.floor(100000 + Math.random() * 900000);

    existAccounts[newAccountId] = req.body;

    console.log(existAccounts);
    saveAccountData(existAccounts);
    res.send({ success: true, msg: "account added successfully" });
});

// Read - get all accounts from the json file
accountRoutes.get("/account/list", (req, res) => {
    const accounts = getAccountData();
    res.send(accounts);
});


//-----------------------------------------------------delete
// delete - using delete method
accountRoutes.delete("/account/delete/:id", (req, res) => {
    fs.readFile(
        dataPath,
        "utf8",
        (err, data) => {
            var existAccounts = getAccountData();
            const userId = req.params["id"];
            delete existAccounts[userId];
            saveAccountData(existAccounts);
            res.send(`La cuenta con el ID: ${userId} se ha borrado`);
            //mostrar las cuentas despues de que borren una en especifico 
            const accounts = getAccountData();
             res.send(accounts);
        },
        true
    );
});

module.exports = accountRoutes;
