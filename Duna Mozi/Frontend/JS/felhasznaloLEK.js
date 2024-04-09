function fillUserList(){
    fetch('http://localhost:8000/user')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const kategoriaDropDown = document.getElementById("dropdown");
        data.forEach((user) => {
            if(user.admin != "1"){
            const option = document.createElement("option");
            option.value = user.idalkalmazott;
            option.text = user.alkalmazottNev;
            kategoriaDropDown.appendChild(option);
            }  
        });
    })
    .catch((err) => {
        console.error(err);
    });
}