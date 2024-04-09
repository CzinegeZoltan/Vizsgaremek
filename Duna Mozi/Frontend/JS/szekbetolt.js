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
            document.getElementById("seatmapA").innerHTML = "";
            document.getElementById("seatmapB").innerHTML = "";
            document.getElementById("seatmapC").innerHTML = "";
            document.getElementById("seatmapD").innerHTML = "";
            document.getElementById("seatmapE").innerHTML = "";
            document.getElementById("seatmapF").innerHTML = "";
            document.getElementById("selected-seats").innerHTML = "";

            document.getElementById("A").innerHTML = "A sor";
            document.getElementById("B").innerHTML = "B sor";
            document.getElementById("C").innerHTML = "C sor";
            document.getElementById("D").innerHTML = "D sor";
            document.getElementById("E").innerHTML = "E sor";
            document.getElementById("F").innerHTML = "F sor";
 

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

            data.forEach((szekek) => {
                if (szekek.foglalt == "1") {
                    const seatDiv = document.createElement("div");
                    seatDiv.className = "seat";
                    seatDiv.textContent = szekek.szekszam;
                    seatDiv.style.backgroundColor = "red";

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
                    button.classList.add('foglalt');
                    button.setAttribute('id',"gomb");
                    button.textContent = szekek.szekszam;

                    button.addEventListener('click', function () {

                        const seatIndex = selectedSeats.indexOf(szekek.szekszam + szekek.sor);
                        if (seatIndex === -1) {
                            if(selectedSeatsID.length+1>30){
                                return alert("Maximum 30 széket foglalhat le!")
                            }
                            else{
                            selectedSeats.push(szekek.szekszam + szekek.sor);
                            selectedSeatsID.push(szekek.ules_id);
                            button.style.backgroundColor = 'green';
                            document.getElementById("mennyiseg").innerHTML = selectedSeatsID.length
                            var vasarButton = document.getElementById("popupButton");
                            vasarButton.disabled = vasarButton.disabled = false;
                            }
                        } else {

                            selectedSeats.splice(seatIndex, 1);
                            selectedSeatsID.splice(seatIndex, 1);
                            button.style.backgroundColor = 'burlywood'
                            document.getElementById("mennyiseg").innerHTML = selectedSeatsID.length
                            if(selectedSeatsID.length == 0){
                                var vasarButton = document.getElementById("popupButton");
                                vasarButton.disabled = true;
                            }
                        }

                        updateSelectedSeats();
                    });

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