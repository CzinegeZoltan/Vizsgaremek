let filmid = [];

function addFilm() {
    const filmekarea = document.getElementById("filmekarea");
    const dropdown = document.getElementById("filmdropdown");

    const selectedOption = dropdown.options[dropdown.selectedIndex];
    if (selectedOption) {
        const id = selectedOption.value;
        const name = selectedOption.text;

        filmid.push(id);

        const div = document.createElement("div");
        div.className = "filmdiv";
        div.id = id;
        div.innerHTML = `<p class="filmp">${name}</p><button class="filmbutton">X</button>`;
        filmekarea.appendChild(div);

        dropdown.remove(dropdown.selectedIndex);

        const button = div.querySelector(".filmbutton");
        button.addEventListener("click", function() {
            filmekarea.removeChild(div);
            dropdown.appendChild(selectedOption);
            const indexToRemove = filmid.indexOf(id);
            if (indexToRemove !== -1) {
                filmid.splice(indexToRemove, 1);
            }
        });
    }
}

function esemenyREG(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            nev: document.getElementById("name").value,
            idopont: document.getElementById("date").value,
            keplink: document.getElementById("link").value,
            filmid: filmid
        })       
    }
    
   fetch("http://localhost:8000/esemenyekreg",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres film feltöltés");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}