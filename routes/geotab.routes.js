const geoTabControllers = require('../servers/geotab.servers')
const router = require("express").Router()

router.get("/api/user", (req, res) => {
    geoTabControllers.print();
//    res.json();
});

module.exports =router;