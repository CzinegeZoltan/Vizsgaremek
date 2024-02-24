function livetoken(){
    fetch('http://localhost:8000/userToken',
        {
            method: "POST",
            headers: {"Content-Type" : "application/json",},
        }
    )
    .then((response) => {
        return response.json();
    })
    .then(data =>{
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        })
    .catch((err) => {
        console.error(err);
    });
}