const jegyek = [];

let osszar = 0;
let jegydb = 0;
let szekdb = 0;
let elozoertek = 0;

function jegyarakVasarlas(){
    
    fetch('http://localhost:8000/jegyek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const vasarlas = document.getElementById("vasarlas");
        vasarlas.innerHTML = "";
        data.forEach((arak) => {
            jegyek.push({id:arak.jegyid, price:arak.ar})
            const div = document.createElement("div");
            div.className="input-container";
            div.innerHTML = `<label class="form-label form-label">${arak.jegynev}:</label><br><input type="number" id="${arak.jegyid}" onkeydown="return false" onchange="jegyek${arak.jegyid}()" required="">`;           
            vasarlas.appendChild(div);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}


function mennyiseg(){
    szekdb = document.getElementById("mennyiseg").innerHTML;
    return szekdb
}



function jegyek1(){
    const jelenlegiertek = document.getElementById("1").value;
    let db = document.getElementById("1").value;

    console.log(jelenlegiertek);
    console.log(elozoertek);
    
    if(jelenlegiertek > elozoertek){
        if(jegydb < szekdb && (jegydb + db) < szekdb){
            jegydb++ ;
        } else {
            document.getElementById("1").value = jelenlegiertek;
            alert("Túl sok jegyet választott ki");       
        }
    } else if (jelenlegiertek < elozoertek){
        jegydb--;
    }

    elozoertek = jelenlegiertek;

    document.getElementById("jegydb").innerHTML = jegydb
    document.getElementById("jegyar").innerHTML = osszar
}