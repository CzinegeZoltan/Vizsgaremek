function vetitesregchek() {
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
        vetitesREG();
    }
}
function vetitesREG(){
    const data = {
        method: "POST",
        headers: {"Content-Type" : "application/json",},
        body: JSON.stringify({
            date: document.getElementById("date").value +" "+ document.getElementById("time").value + ":00",
            terem: document.getElementById("terem").value,
            film: document.getElementById("filmdropdown").value
        })       
    }
    
   fetch("http://localhost:8000/vetitesreg",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres vetites regisztrálása");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}