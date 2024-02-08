function filmREG(){
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
            link: document.getElementById("link").value
        })       
    }
    
   fetch("http://localhost:8000/filmreg",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres film feltöltés");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}