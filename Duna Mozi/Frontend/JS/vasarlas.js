const jegyek = [];

let osszar = 0;
let jegydb = 0;
let szekdb = 0;
let elozoertek = 0;
let jegy1 = 0;
let jegy2 = 0;
let jegy3 = 0;
let jegy4 = 0;
let jegy5 = 0;

function mennyiseg(){
    szekdb = document.getElementById("mennyiseg").innerHTML;
    return szekdb
}

function jegyekreset(){
    return osszar = 0, jegydb = document.getElementById("mennyiseg").innerHTML, szekdb = 0, elozoertek = 0;
}

// Gyermek jegyek
function jegyplusz1(){
    
    if(jegydb + 1 <= szekdb){
        jegydb++;
        jegy1++;
        osszar += jegyek[0].price;
    } else {
        alert("Több jegyet választana ki mint amennyi ülést foglalna le!")
    }
    document.getElementById("1").innerHTML = jegy1;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

function jegyminusz1(){
    if(jegy1 - 1 >= 0){
        jegydb--;
        jegy1--;
        osszar -= jegyek[0].price;
    } else {
        alert("Nem lehet ' minusz ' számú szék mennyiséget venni!")
    }
    document.getElementById("1").innerHTML = jegy1;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

//Felnőtt jegyek
function jegyplusz2(){
    if(jegydb + 1 <= szekdb){
        jegydb++;
        jegy2++;
        osszar += jegyek[1].price;
    } else {
        alert("Több jegyet választana ki mint amennyi ülést foglalna le!")
    }
    document.getElementById("2").innerHTML = jegy2;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

function jegyminusz2(){
    if(jegy2 - 1 >= 0){
        jegydb--;
        jegy2--;
        osszar -= jegyek[1].price;
    } else {
        alert("Nem lehet ' minusz ' számú szék mennyiséget venni!")
    }
    document.getElementById("2").innerHTML = jegy2;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

//Nyugdíjas jegyek
function jegyplusz3(){
    if(jegydb + 1 <= szekdb){
        jegydb++;
        jegy3++;
        osszar += jegyek[2].price;
        console.log(jegy3)
    } else {
        alert("Több jegyet választana ki mint amennyi ülést foglalna le!")
    }
    document.getElementById("3").innerHTML = jegy3;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

function jegyminusz3(){
    if(jegy3 - 1 >= 0){
        jegydb--;
        jegy3--;
        osszar -= jegyek[2].price;
        console.log(jegy3)
    } else {
        alert("Nem lehet ' minusz ' számú szék mennyiséget venni!")
    }
    document.getElementById("3").innerHTML = jegy3;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

//Családi jegycsomag
function jegyplusz4(){
    if(jegydb + 4 <= szekdb){
        jegydb+= 4;
        jegy4++;
        osszar += jegyek[3].price;
    } else {
        alert("Több jegyet választana ki mint amennyi ülést foglalna le!")
    }
    document.getElementById("4").innerHTML = jegy4;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

function jegyminusz4(){
    if(jegy4 - 1 >= 0){
        jegydb-=4;
        jegy4--;
        osszar -= jegyek[3].price;
    } else {
        alert("Nem lehet ' minusz ' számú szék mennyiséget venni!")
    }
    document.getElementById("4").innerHTML = jegy4;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

//10fős csoport jegycsomag
function jegyplusz5(){
    if(jegydb + 10 <= szekdb){
        jegydb+=10;
        jegy5++;
        osszar += jegyek[4].price;
    } else {
        alert("Több jegyet választana ki mint amennyi ülést foglalna le!")
    }
    document.getElementById("5").innerHTML = jegy5;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

function jegyminusz5(){
    if(jegy5 - 1 >= 0){
        jegydb-=10;
        jegy5--;
        osszar -= jegyek[4].price;
    } else {
        alert("Nem lehet ' minusz ' számú szék mennyiséget venni!")
    }
    document.getElementById("5").innerHTML = jegy5;
    document.getElementById("jegydb").innerHTML = jegydb;
    document.getElementById("jegyar").innerHTML = osszar + "Ft";
}

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
            div.innerHTML = `<label class="form-label form-label">${arak.jegynev}:<br><button onclick="jegyplusz${arak.jegyid}()">+1</button><p id="${arak.jegyid}"></p><button onclick="jegyminusz${arak.jegyid}()">-1</button>`;           
            vasarlas.appendChild(div);
        });
        console.log(jegyek)
    })
    .catch((err) => {
        console.error(err);
    });
}

function jegyvasarlas(){
    const lefoglaltulesek = document.getElementById("selected-seats").innerHTML;
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            email: document.getElementById("email").value,
            vetitesid: document.getElementById("dropdown").value,
            ulesek: lefoglaltulesek,
            arosszeg: osszar,
            jegyek: `Gyerek jegy:${jegy1} db, Felnőtt jegy:${jegy2} db, Nyugdíjas jegy:${jegy3} db, Családi jegycsomag:${jegy4} db, Csoportos jegycsomag:${jegy5} db.`,
            uzenet: `Gyerek jegy:${jegy1} db, Felnőtt jegy:${jegy2} db, Nyugdíjas jegy:${jegy3} db, Családi jegycsomag:${jegy4} db, Csoportos jegycsomag:${jegy5} db. Összeg:${osszar}. Ülések: ${lefoglaltulesek}`
        })       
    }

    fetch('http://localhost:8000/jegyvasar', data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            }
            alert("Sikeres ülés foglalás");
        }).catch((error) => {
            console.log(error);
        });
}