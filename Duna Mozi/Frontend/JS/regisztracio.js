function regisztracio(){
const data = {
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value
    }

    console.log(data)

    postData("http://localhost:8000/reg",data)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status == 404) {
            err = document.getElementById("error");
            err.innerHTML = data.error;
        }
        alert("Sikeres felhasználó regisztrálása");
        history.back();
    }).catch((error) => {
        console.log(error);
    });
}