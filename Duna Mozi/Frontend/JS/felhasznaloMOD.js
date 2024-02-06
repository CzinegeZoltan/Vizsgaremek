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
    
    fetch("http://localhost:8000/usermod",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres felhasználó módosítása");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}

function felhTOR(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            id: document.getElementById("dropdown").value
        })  
    }

    fetch("http://localhost:8000/usertor",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres felhasználó törlése");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}