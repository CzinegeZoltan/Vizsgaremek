function fillFilmekList(){
    fetch('http://localhost:8000/filmek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const filmDropDown = document.getElementById("filmdropdown");

        data.forEach((film) => {
            const option = document.createElement("option");
            option.value = film.idfilmek;
            option.text = film.filmnev;
            filmDropDown.appendChild(option);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

fillFilmekList();