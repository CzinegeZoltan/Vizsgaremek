let filmid = [];
function esemenyregchek() {
    var name = document.getElementById("name").value;
    var date = new Date(document.getElementById("date").value);
    var link = document.getElementById("link").value;

    var alapRegex = /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ,\s!?'%()]+$/; 
    var linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;


    if (!name || !date.getTime() || filmid.length == 0 || !link) {
        return alert("Töltsön ki minden mezőt!")
    }
    else if(date.getTime()<=Date.now()){
        return alert("Nem jövőbeli dátumot adott meg!")
    }
    else if (!name.match(alapRegex)) {
        return alert("Hibás cím! Az esemény címe nem engedéjezett karaktert tartalmaz! Ezeket használhatja: a-z A-Z 0-9 Ékezetes karakterek , szóköz ! ? ' % ( )")
    }
    else if (!link.match(linkRegex)) {
        return alert("Hibás link! Nem engedéjezett karaktert tartalmaz!")
    }
    else {
        esemenyREG();
    }
}



function addFilm() {
    if(document.getElementById("filmdropdown").value != 'null'){
        const filmekarea = document.getElementById("filmekarea");
        const dropdown = document.getElementById("filmdropdown");
    
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        if (selectedOption !="null") {
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
    } else {
        return alert("Ezt nem lehet kiválasztani!") 
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
        alert("Sikeres esemény létrehozás");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}