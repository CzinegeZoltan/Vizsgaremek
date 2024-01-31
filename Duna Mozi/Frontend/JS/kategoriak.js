function fillKategoriaList(){
    fetch('http://localhost:8000/kategoria')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const kategoriaDropDown = document.getElementById("dropdown");

        data.forEach((kategoria) => {
            const option = document.createElement("option");
            option.value = kategoria.KategoriaId;
            option.text = kategoria.kategoriNev;
            kategoriaDropDown.appendChild(option);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

fillKategoriaList();