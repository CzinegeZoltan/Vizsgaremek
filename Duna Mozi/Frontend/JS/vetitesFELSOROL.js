function fillVetitesek(){
    fetch('http://localhost:8000/vetitesekfel')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const vetitescontainer = document.getElementById("container");

        data.forEach((vetites) => {
            const div = document.createElement("div");
            div.className="vetites";
            div.style.backgroundImage = `url(${vetites.keplink})`;
                var eredetiDatum = new Date(vetites.datum);
                var ev = eredetiDatum.getFullYear();
                var honap = ('0' + (eredetiDatum.getMonth() + 1)).slice(-2);
                var nap = ('0' + eredetiDatum.getDate()).slice(-2);
                var ora = ('0' + eredetiDatum.getHours()).slice(-2);
                var perc = ('0' + eredetiDatum.getMinutes()).slice(-2);
                var formazottDatumString = ev + '.' + honap + '.' + nap + '. ' + ora + ':' + perc;
            div.innerHTML = `<span class="szoveg"><p>Film címe: ${vetites.nev}</p><p>Időpont: ${formazottDatumString}</p><p>Terem: ${vetites.terem}</p></span>`
            vetitescontainer.appendChild(div);
            vetitescontainer.appendChild(document.createElement("br"));
        })
    })
    .catch((err) => {
        console.error(err);
    });
}

fillVetitesek();