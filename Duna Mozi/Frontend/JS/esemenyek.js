function fillEsemenyek(){
    fetch('http://localhost:8000/esemenyek')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        const vetitescontainer = document.getElementById("container");

        data.forEach((esemenyek) => {
            const div = document.createElement("div");
            div.className="vetites";
            div.id = esemenyek.esemenyid;
            div.style.backgroundImage = `url(${esemenyek.link})`;
                var eredetiDatum = new Date(esemenyek.datum);
                var ev = eredetiDatum.getFullYear();
                var honap = ('0' + (eredetiDatum.getMonth() + 1)).slice(-2);
                var nap = ('0' + eredetiDatum.getDate()).slice(-2);
                var formazottDatumString = ev + '.' + honap + '.' + nap + '.';
            div.innerHTML= `<div class=" szoveg"><p>${esemenyek.esemenyNev}</p><p>${formazottDatumString}</p></div></div>`;
            vetitescontainer.appendChild(div);
            vetitescontainer.appendChild(document.createElement("br"));

            const popup = document.getElementById('popup');
            const closeBtn = document.getElementById('close');

            closeBtn.addEventListener('click', function() {
                popup.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === popup) {
                    popup.style.display = 'none';
                }
            });

            div.addEventListener('click', function(event){
                popup.style.display = 'block';
                const clickedDivId = event.currentTarget.id;

                const data = {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        id: clickedDivId
                    })  
                };
        
                fetch('http://localhost:8000/esemenyekfilmek', data)
                    .then(response => response.json())
                    .then(data => {
                        const esemenyekfilmekpopup = document.getElementById("esemenyinfopopup");
                        esemenyekfilmekpopup.innerHTML = "";
                        esemenyekfilmekpopup.innerHTML = "<h2>Filmek</h2>";
                        data.forEach((info) => {
                            const div = document.createElement("div");
                            div.innerHTML += `<p>${info.filmnev}</p>`;
                            esemenyekfilmekpopup.appendChild(div)
                        })
                    })
                    .catch(error => console.error('Error:', error));

            });
        })
    })
    .catch((err) => {
        console.error(err);
    });
}

fillEsemenyek();