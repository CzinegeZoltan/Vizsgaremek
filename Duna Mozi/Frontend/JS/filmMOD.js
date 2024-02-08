function filmMOD(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            szereplok: document.getElementById("szereplok").value,
            desription: document.getElementById("desription").value,
            hossz: document.getElementById("hossz").value + " perc",
            korhatar: document.getElementById("korhatar").value,
            kategoria: document.getElementById("dropdown").value,
            link: document.getElementById("link").value,
            id: document.getElementById("filmdropdown").value
        })       
    }
    
   fetch("http://localhost:8000/filmmod",data)
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

function filmTOR(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            id: document.getElementById("filmdropdown").value
        })  
    }

    fetch("http://localhost:8000/filmtor",data)
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