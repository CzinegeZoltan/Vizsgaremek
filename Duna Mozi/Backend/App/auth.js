//Ebben a js fájlban lementjük a felhasználó id-t
let felhID = null;

function felhIDraktarozas(id){
    felhID = id;
}

function felhIDlekeres(){
    return felhID;
}


function felhIDtorles(){
    felhID = null;
}


exports.felhIDraktarozas = felhIDraktarozas;
exports.felhIDlekeres = felhIDlekeres;
exports.felhIDtorles = felhIDtorles