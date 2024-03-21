function regchek() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    var userNameRegex = /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/;
    var emailRegex = /^[a-z0-9._+\-~]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    var passwordRegex = /^[a-zA-Z0-9._+\-~!?]+$/;

    if (!name || !email || !password || !password2) {
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
    else if(!password2.match(passwordRegex)){
        return alert("Hibás jelszó! A jelszó csak a-z kisbetűket A-Z nagybetűket 0-9 számokat valamint ezen karaktereket: . _ + - ~ ! ? tartalmazhat! Ékezetes karaktert NEM!")
    }
    else if(password.length <8 || password2.length <8){
        return alert("Rövid jelszó! A jelszónak minimum 8 karakter hosszúnak kell lenie!")
    }
    else {
        regisztracio();
    }
}
function regisztracio() {
    const data = {
        name: document.getElementById("name").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value
    }

    console.log(data)

    postData("http://localhost:8000/reg", data)
        .then((response) => {
            return response.json();
        }).then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            }
            alert("Sikeres felhasználó regisztrálása");
            history.back();
        }).catch((error) => {
            console.log(error);
        });
}