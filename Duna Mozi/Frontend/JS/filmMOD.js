function filmMOD() {
    const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            szereplok: document.getElementById("szereplok").value,
            description: document.getElementById("desription").value,
            hossz: document.getElementById("hossz").value + " perc",
            korhatar: document.getElementById("korhatar").value,
            kategoria: document.getElementById("dropdown").value,
            link: document.getElementById("link").value,
            id: document.getElementById("filmdropdown").value
        })
    };

    fetch("http://localhost:8000/filmmod", data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            } else {
                alert("Sikeres film módosítása");
                history.back();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function filmTOR() {
    const data = {
        method: "DELETE", // Change method to DELETE
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: document.getElementById("filmdropdown").value
        })
    };

    fetch("http://localhost:8000/filmtor", data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            } else {
                alert("Sikeres film törlése"); // Successful deletion message
                history.back();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}