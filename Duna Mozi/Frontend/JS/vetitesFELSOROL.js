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
            div.innerHTML = `span class="szoveg><p>Film címe: ${vetites.nev}</p><p>Időpont: ${vetites.datum}</p><p>Helyszín: ${vetitesek.terem}</p>"`
            vetitescontainer.appendChild(div);
        })
    })
    .catch((err) => {
        console.error(err);
    });
}

fillVetitesek();