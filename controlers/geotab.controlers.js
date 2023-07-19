const geoTabService = require('../servers/geotab.servers')


function users(){
    geoTabService.users();
}
function devices(){
    geoTabService.devices();
}
function deviceStatusInfo(id){
    geoTabService.deviceStatusInfo();
}
module.exports ={
    geoTabService,
    print
}