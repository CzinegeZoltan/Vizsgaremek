function loginchek() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var emailRegex = /^[a-z0-9._+\-~]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    var passwordRegex = /^[a-zA-Z0-9._+\-~!?]+$/;

    if ( !email || !password) {
        return alert("Kérem töltse ki az adatbeviteli mezőket!")
    }
    else if (!email.match(emailRegex)) {
        return alert("Hibás E-mail cím! Az E-mail cím nem érvényes!")
    }
    else if (!password.match(passwordRegex)) {
        return alert("Hibás jelszó! A jelszó csak a-z kisbetűket A-Z nagybetűket 0-9 számokat valamint ezen karaktereket: . _ + - ~ ! ? tartalmazhat! Ékezetes karaktert NEM!")
    }
    else {
        login();
    }
}
function login(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })       
    }
    loginData(data)
} 
  
loginData = (data) => {    

    fetch('http://localhost:8000/login', data)
    .then((response) => {
        return response.json();
    }).then(data =>{
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        localStorage.setItem("userID",data.userID)
        localStorage.setItem("userMail",data.userMail)
            window.location.href = data.redirection;
        }).catch((err) => {
            console.error(err);
           return alert("Rossz e-mail vagy jelszó!")
        });
}
