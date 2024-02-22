function fillFilmek(){
    fetch('http://localhost:8000/filmek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const filmposzter = document.getElementById("poszter");

        data.forEach((film, index) => {
            if (index % 4 === 0) {

                const row = document.createElement("div");
                row.className = "row";
                filmposzter.appendChild(row);
            }
        
            const div = document.createElement("div");
            div.className = "col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 film";
            div.id = film.idfilmek;
            div.innerHTML = `<img src="${film.film_keplink}" class="img-thumbnail poster"/>`;
            
            const popup = document.getElementById('popup');
            const closeBtn = document.getElementById('close');

            closeBtn.addEventListener('click', function() {
                popup.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === popup) {
                    popup.style.display = 'none';
                }
            });

            div.addEventListener('click', function(event){
                popup.style.display = 'block';
                const clickedDivId = event.currentTarget.id;
              
                const data = {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        id: clickedDivId
                    })  
                };
        
                fetch('http://localhost:8000/filmekinfo', data)
                    .then(response => response.json())
                    .then(data => {
                        const filminfopopup = document.getElementById("filminfopopup");
                        filminfopopup.innerHTML = "";
                        data.forEach((info) => {
                            const div = document.createElement("div");
                            // div.className("");
                            div.innerHTML = `<h2>${info.filmnev}</h2><h4>Film szereplők:</h4><p>${info.foszereplok}</p><h4>Leírás:</h4><p>${info.filmdescription}</p><h4>Film hossza:</h4><p>${info.filmhossz}</p><h4>Korhatár:</h4><p>${info.kor}</p>`;
                            filminfopopup.appendChild(div)
                        })
                    })
                    .catch(error => console.error('Error:', error));

            });


            const rows = filmposzter.querySelectorAll(".row");
            rows[rows.length - 1].appendChild(div);
        });

    })
    .catch((err) => {
        console.error(err);
    });
}

fillFilmek();