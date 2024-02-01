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
    if(!email.value || !password.value){
        console.log("Hibás kitöltés!");
        return;
    }

    console.log(data)
    
    fetch('http://localhost:8000/login', data)
    .then((response) => {
        return response.json();
    }).then(data =>{
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
            console.log(data)
            window.location.href = data.redirection;
        }).catch((err) => {
            console.error(err);
        });
}
