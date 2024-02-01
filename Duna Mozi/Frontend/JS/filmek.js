function fillFilmek(){
    fetch('http://localhost:8000/filmek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const filmposzter = document.getElementById("poszter");

        data.forEach((film, index) => {
            if (index % 4 === 0) {
                // Start a new row
                const row = document.createElement("div");
                row.className = "row";
                filmposzter.appendChild(row);
            }
        
            // Create a column for each film
            const div = document.createElement("div");
            div.className = "col-xs-6 col-sm-6 col-md-3 col-lg-3";
            div.innerHTML = `<img src="${film.film_keplink}" class="img-thumbnail"/>`;
            
            // Append the column to the last row
            const rows = filmposzter.querySelectorAll(".row");
            rows[rows.length - 1].appendChild(div);
        });

    })
    .catch((err) => {
        console.error(err);
    });
}

fillFilmek();