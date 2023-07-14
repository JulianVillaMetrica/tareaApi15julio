const geoTabServers = require('../servers/geotab.servers')
const router = require("express").Router()

router.get("/api/user", (req, res) => {
    geoTabServers.users();
  //  console.log("first")
    res.json();

});

router.get("/api/devices", (req, res) => {
    geoTabServers.devices();
    res.json();

});
router.get("/api/deviceStatusInfo", (req, res) => {
    geoTabServers.deviceStatusInfo();
    res.json();

});

module.exports = router;