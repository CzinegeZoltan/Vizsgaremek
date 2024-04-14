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
                    localStorage.removeItem("selectedVetitesId");
                    const posterDiv = document.getElementById("poster");
                    const img = document.createElement("img");
                    img.src = localStorage.getItem("selectedVetitesKeplink");
                    img.alt = "Film poszter";
                    img.className = "poster";
                    posterDiv.appendChild(img);
                    localStorage.removeItem("selectedVetitesKeplink");
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
