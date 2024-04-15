function livetoken() {
    fetch('http://localhost:8000/userToken', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: localStorage.getItem("userID"),
                userMail: localStorage.getItem("userMail")
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('A hívás sikertelen volt.');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 404) {
                const err = document.getElementById("error");
                err.innerHTML = data.error;
                window.location.href = "bejel.html";
            }
            else(
                setTimeout(() => {kilepes()}, 600000)
            )
        })
        .catch((err) => {
            console.error('Hiba történt a hálózati kérés során:', err);
            window.location.href = "bejel.html";
        });
}