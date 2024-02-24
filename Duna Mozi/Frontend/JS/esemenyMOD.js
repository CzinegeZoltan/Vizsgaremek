function esemenyMOD(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            idopont: document.getElementById("date").value,
            keplink: document.getElementById("link").value,
            id: document.getElementById("dropdown").value
        })       
    }
    
   fetch("http://localhost:8000/esemenymod",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres film módósítása");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}

function esemenyTOR(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            id: document.getElementById("dropdown").value
        })  
    }

    fetch("http://localhost:8000/esemenytor",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres film törlése");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}