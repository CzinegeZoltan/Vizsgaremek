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