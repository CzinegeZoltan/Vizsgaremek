function fillVetitesekList(){
    fetch('http://localhost:8000/vetitesek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const vetitesDropDown = document.getElementById("dropdown");
        data.forEach((vetitesek) => {
            const option = document.createElement("option");
            option.value = vetitesek.idvetitesek;
            option.text = vetitesek.filmnev;
            vetitesDropDown.appendChild(option);
        });
    }).catch((error) => {
        console.log(error);
    });
}

fillVetitesekList();