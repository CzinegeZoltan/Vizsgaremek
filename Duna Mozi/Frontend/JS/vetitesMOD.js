function vetitesMOD(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            date: document.getElementById("date").value +" "+ document.getElementById("time").value + ":00",
            terem: document.getElementById("terem").value,
            film: document.getElementById("filmdropdown").value,
            vetitesid: document.getElementById("dropdown").value
        })       
    }

   fetch("http://localhost:8000/vetitesmod",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres vetites módósítása");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}

function vetitesTOR(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            vetitesid: document.getElementById("dropdown").value
        })  
    }

    fetch("http://localhost:8000/vetitestor",data)
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