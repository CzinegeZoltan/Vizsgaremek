function VetitesekINFO(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({id: document.getElementById("dropdown").value}) 
    }

    fetch('http://localhost:8000/vetitesekinfo',data)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        //Kitöröljük az adatokat ha egy másik eseményt szeretnénk kiválasztani
        document.getElementById("idopont").innerHTML = "";
        document.getElementById("helyszin").innerHTML = "";


        //Be helyezzük az adatokat
        document.getElementById("idopont").innerHTML = data[0].datum;
        document.getElementById("helyszin").innerHTML = data[0].Terem;
    }).catch((error) => {
        console.log(error);
    });
}