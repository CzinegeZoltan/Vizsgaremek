function fillJegyekarList(){
    fetch('http://localhost:8000/jegyek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const jegyektable= document.getElementById("jegyarak");

        data.forEach((jegyek) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<th>${jegyek.jegynev}</th><th>${jegyek.ar}</th>`
            jegyektable.appendChild(tr);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

fillJegyekarList();