function fillEsemenyekList(){
    fetch('http://localhost:8000/esemenyek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const esemenyDropDown = document.getElementById("dropdown");

        data.forEach((esemeny) => {
            const option = document.createElement("option");
            option.value = esemeny.esemenyid;
            option.text = esemeny.esemenyNev;
            esemenyDropDown.appendChild(option);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

fillEsemenyekList();