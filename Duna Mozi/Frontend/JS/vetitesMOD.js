function vetitesmodchek() {
    var date = new Date(document.getElementById("date").value);
    var time = document.getElementById("time").value;
    var terem = document.getElementById("terem").value;

    var teremRegex = /^[1234]+$/; 


    if ( !date.getTime() ||!time || !terem) {
        return alert("Töltsön ki minden mezőt!")
    }
     else if(date.getTime()<=Date.now()){
         return alert("Nem jövőbeli dátumot adott meg!")
     }
     else if (!terem.match(teremRegex)){
        return alert("Nem létező terem!")
     }
    else {
        vetitesMOD();
    }
}
function vetitesMOD() {
    const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            datum: document.getElementById("date").value + " " + document.getElementById("time").value + ":00",
            filmid: document.getElementById("filmdropdown").value,
            vetitesid: document.getElementById("dropdown").value
        })
    };

    console.log(data);

    fetch("http://localhost:8000/vetitesmod", data)
    .then(response => response.json())
    .then(data => {
        if (data.status === 404) {
            console.error(data.error);
        } else {
            alert("Sikeres vetités modósítás");
            history.back();
        }
    })
    .catch(error => console.error(error));
}

function vetitesTOR() {
    const data = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            vetitesid: document.getElementById("dropdown").value
        })
    };

    fetch("http://localhost:8000/vetitestor", data)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            } else {
                alert("Sikeres vetités törlése");
                history.back();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}