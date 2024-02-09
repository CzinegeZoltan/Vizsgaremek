let {selectedseatsID} = require('./szekbetolt')

function fillJegyekarList(){
    fetch('http://localhost:8000/jegyek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const jegyektable= document.getElementById("jegyarak");

        data.forEach((jegyek) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<th>${jegyek.jegynev}</th><th>${jegyek.ar}</th>`
            jegyektable.appendChild(tr);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

fillJegyekarList();


function jegyarakVasarlas(){
    
    fetch('http://localhost:8000/jegyek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const vasarlas = document.getElementById("vasarlas");
        vasarlas.innerHTML = "";
        data.forEach((arak) => {
            const div = document.createElement("div");
            div.className="input-container";
            div.innerHTML = `<label class="form-label form-label">${arak.jegynev}:</label><br><input type="number" id="${arak.jegyid}" required="">`;           
            vasarlas.appendChild(div);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

function mennyiseg(){

}