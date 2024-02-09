let selectedSeatsID = [];

function fillSzekList(){
    const selectedSeats = []
    selectedSeatsID = []

    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            id: document.getElementById("dropdown").value
        })       
    }

    fetch('http://localhost:8000/szekek', data)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            // Kitöröljük at előző adatokat
            document.getElementById("seatmapA").innerHTML = "";
            document.getElementById("seatmapB").innerHTML = "";
            document.getElementById("seatmapC").innerHTML = "";
            document.getElementById("seatmapD").innerHTML = "";
            document.getElementById("seatmapE").innerHTML = "";
            document.getElementById("seatmapF").innerHTML = "";
            document.getElementById("selected-seats").innerHTML = "";
 

            // Szerezzen hivatkozásokat konténer elemekre
            const szekekButtonsA = document.getElementById("seatmapA");
            const szekekButtonsB = document.getElementById("seatmapB");
            const szekekButtonsC = document.getElementById("seatmapC");
            const szekekButtonsD = document.getElementById("seatmapD");
            const szekekButtonsE = document.getElementById("seatmapE");
            const szekekButtonsF = document.getElementById("seatmapF");


            function updateSelectedSeats() {
                const selectedSeatsSpan = document.getElementById("selected-seats");
                selectedSeatsSpan.textContent = selectedSeats.join(', ');
            }

            // ismételt végrehajtás az adatokon, és hozzon létre gombokat dinamikusan
            data.forEach((szekek) => {
                if (szekek.foglalt == "1") {
                    const seatDiv = document.createElement("div");
                    seatDiv.className = "seat";
                    seatDiv.textContent = szekek.szekszam;
                    seatDiv.style.backgroundColor = "red";

                    // Adja hozzá a div-t a megfelelő tárolóhoz a sor alapján
                    switch (szekek.sor) {
                        case "A":
                            szekekButtonsA.appendChild(seatDiv);
                            break;
                        case "B":
                            szekekButtonsB.appendChild(seatDiv);
                            break;
                        case "C":
                            szekekButtonsC.appendChild(seatDiv);
                            break;
                        case "D":
                            szekekButtonsD.appendChild(seatDiv);
                            break;
                        case "E":
                            szekekButtonsE.appendChild(seatDiv);
                            break;
                        case "F":
                            szekekButtonsF.appendChild(seatDiv);
                            break;
                        default:
                            break;
                    }
                } else {
                    const button = document.createElement("button");
                    button.value = szekek.ules_id;
                    button.classList.add('a');
                    button.setAttribute('id',"gomb");
                    button.textContent = szekek.szekszam;

                    // Adja hozzá az eseményfigyelőt a gombhoz
                    button.addEventListener('click', function () {

                        const seatIndex = selectedSeats.indexOf(szekek.szekszam + szekek.sor);
                        if (seatIndex === -1) {

                            selectedSeats.push(szekek.szekszam + szekek.sor);
                            selectedSeatsID.push(szekek.ules_id);
                            button.style.backgroundColor = 'green';
                            document.getElementById("mennyiseg").innerHTML = selectedSeatsID.length
                        } else {

                            selectedSeats.splice(seatIndex, 1);
                            selectedSeatsID.splice(seatIndex, 1);
                            button.style.backgroundColor = 'burlywood'
                            document.getElementById("mennyiseg").innerHTML = selectedSeatsID.length
                        }

                        updateSelectedSeats();
                    });

                    // A sor alapján fűzze hozzá a gombot a megfelelő tárolóhoz
                    switch (szekek.sor) {
                        case "A":
                            szekekButtonsA.appendChild(button);
                            break;
                        case "B":
                            szekekButtonsB.appendChild(button);
                            break;
                        case "C":
                            szekekButtonsC.appendChild(button);
                            break;
                        case "D":
                            szekekButtonsD.appendChild(button);
                            break;
                        case "E":
                            szekekButtonsE.appendChild(button);
                            break;
                        case "F":
                            szekekButtonsF.appendChild(button);
                            break;
                        default:
                            break;
                    }
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
}


function proba(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            ulesek: selectedSeatsID
        })       
    }

    fetch('http://localhost:8000/ulesfoglal', data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            }
            alert("Sikeres ülés foglalás");
            window.location.href = "../Index.html"
        }).catch((error) => {
            console.log(error);
        });
}

exports.selectedSeatsID = selectedSeatsID;