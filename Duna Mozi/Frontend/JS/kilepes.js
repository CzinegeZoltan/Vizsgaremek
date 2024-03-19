function kilepes(){
    fetch('http://localhost:8000/kilep')
    .then((response) => {
        return response.json();
    }).then(data =>{
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        localStorage.removeItem("userID")
        window.location.href = data.redirection;
    }).catch((err) => {
        console.error(err);
    });
}