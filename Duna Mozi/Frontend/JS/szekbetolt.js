function fillSzekList(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            id: document.getElementById("dropdown").value
        })       
    }

    fetch('http://localhost:8000/szekek',data)
    .then((response) => {
        return response.json();
    }).then(data => {
        document.getElementById("seatmapA").innerHTML = "";
        document.getElementById("seatmapB").innerHTML = "";
        document.getElementById("seatmapC").innerHTML = "";
        document.getElementById("seatmapD").innerHTML = "";
        document.getElementById("seatmapE").innerHTML = "";
        document.getElementById("seatmapF").innerHTML = "";
        const szekekButtonsA = document.getElementById("seatmapA");
        const szekekButtonsB = document.getElementById("seatmapB");
        const szekekButtonsC = document.getElementById("seatmapC");
        const szekekButtonsD = document.getElementById("seatmapD");
        const szekekButtonsE = document.getElementById("seatmapE");
        const szekekButtonsF = document.getElementById("seatmapF");

        data.forEach((szekek) => {
            if(szekek.sor == "A"){
                if(szekek.foglalt == "1"){
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}" style=background-color:red>${szekek.szekszam}</div>`
                    szekekButtonsA.appendChild(div);
                } else {
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}">${szekek.szekszam}</div>`
                    szekekButtonsA.appendChild(div);
                }
                
            }
            if(szekek.sor == "B"){
                if(szekek.foglalt == "1"){
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}" style=background-color:red>${szekek.szekszam}</div>`
                    szekekButtonsB.appendChild(div);
                } else {
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}">${szekek.szekszam}</div>`
                    szekekButtonsB.appendChild(div);
                }
            }
            if(szekek.sor == "C"){
                if(szekek.foglalt == "1"){
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}"data-seat="${szekek.sor}${szekek.szekszam}" style=background-color:red>${szekek.szekszam}</div>`
                    szekekButtonsC.appendChild(div);
                } else {
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}">${szekek.szekszam}</div>`
                    szekekButtonsC.appendChild(div);
                }
            }
            if(szekek.sor == "D"){
                if(szekek.foglalt == "1"){
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}" style=background-color:red>${szekek.szekszam}</div>`
                    szekekButtonsD.appendChild(div);
                } else {
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}">${szekek.szekszam}</div>`
                    szekekButtonsD.appendChild(div);
                }
            }
            if(szekek.sor == "E"){
                if(szekek.foglalt == "1"){
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}" style=background-color:red>${szekek.szekszam}</div>`
                    szekekButtonsE.appendChild(div);
                } else {
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}">${szekek.szekszam}</div>`
                    szekekButtonsE.appendChild(div);
                }
            }
            if(szekek.sor == "F"){
                if(szekek.foglalt == "1"){
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}" style=background-color:red>${szekek.szekszam}</div>`
                    szekekButtonsF.appendChild(div);
                } else {
                    const div = document.createElement("div");
                    div.className = "ulessor"
                    div.innerHTML=`<div class='seat' id="${szekek.sor}${szekek.szekszam}" data-seat="${szekek.sor}${szekek.szekszam}">${szekek.szekszam}</div>`
                    szekekButtonsF.appendChild(div);
                }
            }
        });
    })

    .catch((error) => {
        console.log(error);
    });
}