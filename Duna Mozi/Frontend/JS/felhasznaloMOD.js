function felhmodchek() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userNameRegex = /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/;
    var emailRegex = /^[a-z0-9._+\-~]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    var passwordRegex = /^[a-zA-Z0-9._+\-~!?]+$/;

    if (!name || !email || !password) {
        return alert("Töltsön ki minden mezőt!")
    }
    else if (!name.match(userNameRegex)) {
        return alert("Hibás név! A felhasználónév csak kis és nagy betűket és számokat tartalmazhat!")
    }
    else if (!email.match(emailRegex)) {
        return alert("Hibás E-mail cím! Az E-mail cím nem érvényes!")
    }
    else if (!password.match(passwordRegex)) {
        return alert("Hibás jelszó! A jelszó csak a-z kisbetűket A-Z nagybetűket 0-9 számokat valamint ezen karaktereket: . _ + - ~ ! ? tartalmazhat! Ékezetes karaktert NEM!")
    }
    else if(password.length <8){
        return alert("Rövid jelszó! A jelszónak minimum 8 karakter hosszúnak kell lenie!")
    }
    else {
        felhMod();
    }
}
function felhMod() {
    const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value,
            id: document.getElementById("dropdown").value
        })
    };

    fetch("http://localhost:8000/usermod", data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            } else {
                alert("Sikeres felhasználó módosítása");
                history.back();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function felhTOR() {
    const data = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: document.getElementById("dropdown").value
        })
    };

    fetch("http://localhost:8000/usertor", data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            } else {
                alert("Sikeres felhasználó törlése");
                history.back();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}