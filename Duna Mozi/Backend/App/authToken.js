//Ebben a js fájlban lementjük a felhasználó tokenjét
let felhTOKEN = null;

function felhTOKENraktarozas(id){
    felhTOKEN = id;
}

function felhTOKENlekeres(){
    return felhTOKEN;
}


function felhTOKENtorles(){
    felhTOKEN = null;
}


exports.felhTOKENraktarozas = felhTOKENraktarozas;
exports.felhTOKENlekeres = felhTOKENlekeres;
exports.felhTOKENtorles = felhTOKENtorles