function esemenymodchek() {
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
        esemenyMOD();
    }
}

function esemenyMOD() {
    const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nev: document.getElementById("name").value,
            idopont: document.getElementById("date").value,
            keplink: document.getElementById("link").value,
            eid: document.getElementById("dropdown").value
        })
    };

    fetch("http://localhost:8000/esemenymod", data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            } else {
                alert("Sikeres esemény módosítás");
                history.back();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function esemenyTOR() {
    const data = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: document.getElementById("dropdown").value
        })
    };

    fetch("http://localhost:8000/esemenytor", data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            } else {
                alert("Sikeres esemény törlése");
                history.back();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}