console.log("ddddddddddddddd")

function fillUserList(){
    fetch('http://localhost:8000/user')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const kategoriaDropDown = document.getElementById("dropdown");

        data.forEach((user) => {
            const option = document.createElement("option");
            option.value = user.alkalmazottNev;
            option.text = user.idalkalmazott;
            kategoriaDropDown.appendChild(option);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

fillUserList();