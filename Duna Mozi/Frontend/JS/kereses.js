function Katker() {
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({katvalue: document.getElementById("dropdown").value}) 
    }

    fetch(`http://localhost:8000/kereses`, data)
    .then((response) => {
        return response.json();
    })
    .then(data => {

        const filmposzter = document.getElementById("poszter");

        filmposzter.innerHTML="";

        data.forEach((film, index) => {
            if (index % 4 === 0) {
                // Új sor
                const row = document.createElement("div");
                row.className = "row";
                filmposzter.appendChild(row);
            }
        
            // Létre hoz egy oszlopot minden filmhez
            const div = document.createElement("div");
            div.className = "col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3";
            div.innerHTML = `<img src="${film.film_keplink}" class="img-thumbnail poster"/>`;
            
            // Az oszlop hozzáfűzése az utolsó sorhoz
            const rows = filmposzter.querySelectorAll(".row");
            rows[rows.length - 1].appendChild(div);
        });

    })
    .catch((err) => {
        console.error(err);
    });
}