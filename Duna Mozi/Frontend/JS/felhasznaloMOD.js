function felhMod(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value,
            id: document.getElementById("dropdown").value
        })  
    }
    
        console.log(data)
    
        fetch("http://localhost:8000/usermod",data)
        .then((response) => {
            return response.json();
        }).then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            }
        }).catch((error) => {
            console.log(error);
        });
    }