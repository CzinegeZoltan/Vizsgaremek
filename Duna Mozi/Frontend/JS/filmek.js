function fillFilmek(){
    fetch('http://localhost:8000/filmek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const filmposzter = document.getElementById("poszter");

        data.forEach((film) => {
            const div = document.createElement("div");
            div.innerHTML = (`<div class="row"><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="${film.film_keplink}" class="img-thumbnail"/></div>`);
            filmposzter.appendChild(div);
        })
    })
    .catch((err) => {
        console.error(err);
    });
}

fillFilmek();