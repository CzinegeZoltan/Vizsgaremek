let keplink = "";
let idopont = "";
let helyszin = "";

function fillVetitesekList() {
    fetch('http://localhost:8000/vetitesek')
        .then((response) => {
            return response.json();
        })
        .then(data => {
            const vetitesDropDown = document.getElementById("dropdown");

            data.forEach((vetitesek) => {

                const option = document.createElement("option");
                const selectedVetitesId = localStorage.getItem("selectedVetitesId");
                if (selectedVetitesId && vetitesek.idvetitesek === parseInt(selectedVetitesId)) {
                    option.selected = true;
                    const posterDiv = document.getElementById("poster");
                    const img = document.createElement("img");
                    img.src = localStorage.getItem("selectedVetitesKeplink");
                    keplink = localStorage.getItem("selectedVetitesKeplink");
                    img.alt = "Film poszter";
                    img.className = "poster";
                    img.id = "poszter";
                    posterDiv.appendChild(img);
                    idopont = localStorage.getItem("selectedVetitesDatum");
                    var eredetiDatum = new Date(idopont);
                    var ev = eredetiDatum.getFullYear();
                    var honap = ('0' + (eredetiDatum.getMonth() + 1)).slice(-2);
                    var nap = ('0' + eredetiDatum.getDate()).slice(-2);
                    var ora = ('0' + eredetiDatum.getHours()).slice(-2);
                    var perc = ('0' + eredetiDatum.getMinutes()).slice(-2);
                    var formazottDatumString = ev + '.' + honap + '.' + nap + '. ' + ora + ':' + perc;
                    helyszin = localStorage.getItem("selectedVetitesTerem");
                    const idopontP = document.getElementById("idopont");
                    idopontP.innerText = `${formazottDatumString}`;
                    const helyszinP = document.getElementById("helyszin");
                    helyszinP.innerText = `${helyszin}-se terem`;
                    localStorage.removeItem("selectedVetitesKeplink");
                    localStorage.removeItem("selectedVetitesDatum");
                    localStorage.removeItem("selectedVetitesTerem");
                    localStorage.removeItem("selectedVetitesId");
                }
                option.value = vetitesek.idvetitesek;
                option.text = vetitesek.filmnev;
                vetitesDropDown.appendChild(option);

                fillSzekList();
                jegyekreset();
            });
        }).catch((error) => {
            console.log(error);
        });
}

fillVetitesekList();
