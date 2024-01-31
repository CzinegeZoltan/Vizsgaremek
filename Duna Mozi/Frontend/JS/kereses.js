// window.onload=function() {document.getElementById("filmek_helye").innerHTML=('<div class="row"><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="IMG/POSTERS/Star_Trek_I_The_Motion_Picture.jpg"class="img-thumbnail" width="338" height="500" /></div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS/Star_Trek_II_The_Wrath_of_Khan.jpg"class="img-thumbnail" width="338" height="500" /></div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS/Star_Trek_III_The_Search_For_Spock.jpg" class="img-thumbnail" width="338"height="500" /></div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS/Star_Trek_IV_The_Voyage_Home.jpg" class="img-thumbnail" width="338" height="500" /> </div></div><div class="row"><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="IMG/POSTERS/Star_Trek_V_The_Final_Frontier.jpg"  class="img-thumbnail" width="338" height="500" /> </div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img  src="IMG/POSTERS/Star_Trek_VI_The_Undiscoverd_Country.jpg" class="img-thumbnail" width="338" height="500" /></div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS/Star_Trek_VII_Generations.jpg" class="img-thumbnail" width="338" height="500" /></div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="IMG/POSTERS/Star_Trek_VIII_First_Contact.jpg" class="img-thumbnail" width="338" height="500" /></div></div><div class="row"><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS/Star_Trek_IX_Insurrection.jpg"    class="img-thumbnail" width="338" height="500" /> </div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="IMG/POSTERS/Star_Trek_X_Nemesis.jpg" class="img-thumbnail" width="338" height="500" /></div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="IMG/POSTERS/Star_Trek_XI_The_Future_Begins.jpg"class="img-thumbnail" width="338" height="500" /> </div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="IMG/POSTERS/Star_Trek_XII_Into_Darkness.jpg"  class="img-thumbnail" width="338" height="500" /> </div></div><div class="row"><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="IMG/POSTERS/Star_Trek_XIII_Beyond.jpg" class="img-thumbnail" width="338" height="500" /> </div>  <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS" class="img-thumbnail" width="338" height="500" /></div> <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS" class="img-thumbnail" width="338" height="500" /></div><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "> <img src="IMG/POSTERS" class="img-thumbnail" width="338" height="500" /> </div></div> ');}
function Katker() {
    const kaID = {
        katvalue: document.getElementById("dropdown").value
    }

    console.log(kaID.katvalue)

    fetch(`http://localhost:8000/kereses`, kaID)
    .then((response) => {
        return response.json();
        
    })
    .then(data => {
        console.log(data);

        const filmposzter = document.getElementById("poszter");

        data.forEach((film) => {
            const div = document.createElement("div");
            div.innerHTML = (`<div class="row"><div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 "><img src="${film.film_keplink}" class="img-thumbnail"/></div>`);
            filmposzter.appendChild(div);
        })
    })
    .catch((err) => {
        console.error(err);
    });
}

//document.getElementById("demo").innerHTML = ;
    /**<div class="row">
            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 ">
                <img src="IMG/POSTERS/" class="img-thumbnail" width="338" height="500" />
            </div>
            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 ">
                <img src="IMG/POSTERS/" class="img-thumbnail" width="338" height="500" />
            </div>
            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 ">
                <img src="IMG/POSTERS/" class="img-thumbnail" width="338" height="500" />
            </div>
            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 ">
                <img src="IMG/POSTERS/" class="img-thumbnail" width="338" height="500" />
            </div>
        </div> */