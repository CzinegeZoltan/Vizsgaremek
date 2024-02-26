function fillJegyekarList() {
    fetch('http://localhost:8000/jegyek')
        .then(response => response.json())
        .then(data => {
            const jegyektable = document.getElementById("tablejegy");

            data.forEach(jegyek => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${jegyek.jegynev}</td><td>${jegyek.ar}</td>`;
                jegyektable.appendChild(tr);
            });

            // Bootstrap osztályok hozzáadása
            jegyektable.classList.add("table", "table-bordered", "table-hover", "table-striped");
        })
        .catch(err => console.error(err));
}

fillJegyekarList();
