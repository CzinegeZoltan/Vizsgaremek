const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Config = require('../App/config');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(cors({ origin: '*' })); //CORS Betöltés
app.use(express.json()); //POST kérésekben body elérése

app.get('/', (req, res) => { //Szerver futási teszt
  res.send("<h1>Szerver fut</h1>")
})

app.get('/user', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a user csatlakozás');
    })
    con.query('select * from alkalmazott', (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.post('/login', (req,res) =>{
    var con = mysql.createConnection(new Config());
    con.connect(function(err){
        if (err) throw err;
        console.log('Sikeres csatlakozás');
    })

    const userSQL = "SELECT admin,idalkalmazott, alkalmazottNev FROM alkalmazott WHERE email = ? AND jelszo = ?";
    con.query(userSQL, [req.body.email, req.body.password], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ status: 500, error: "Hiba a lekérdezéskor" });
        } else {
          if (result.length === 0) {
            console.log("Sikertelen bejelentkezés");
            res.status(401).json({ status: 'error', message: 'Sikertelen bejelentkezés' });
          } else if (result.length === 1) {
            console.log("Sikeres bejelentkezés");
            const userRole = result[0].admin;
            switch (userRole) {
              case 0:
                res.status(200).json({ status: 'success', message: 'Sikeres bejelentkezés', admin:0});
                console.log("Dolgozó");
                break; 
              case 1:
                res.status(200).json({ status: 'success', message: 'Sikeres bejelentkezés', admin:1});
                console.log("Admin")
                break;
              default:
                res.status(404).json({ status: 'error', message: 'Sikertelen bejelentkezés'});
                console.log("failed")
                break;
            }
          }
        }
      });
    con.end();
});

app.post('/reg', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
        const userSQL = 'insert into alkalmazott (alkalmazottNev,jelszo,email,admin) values (?,?,?,?)';
        con.query(userSQL, [req.body.name, req.body.password, req.body.email,0], (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send({ status: 404, error: "Hiba a user rögzítésekor" });
            } else {
                res.status(200).send({ status: 200, success: "Sikeres adatrögzítés" })
            }
        })
});

app.get('/kategoria', (req, res) => {

  var con = mysql.createConnection(new Config());
  con.connect(function (err) {
      if (err) throw err;
      console.log('sikeresen le lett kérdezve a kategóriák');
  })
  con.query('select KategoriaId,kategoriNev from kategoria', (err, result) => {
      if (err) throw err;
      res.send(result);
  })
})

app.get('/filmek', (req, res) => {

  var con = mysql.createConnection(new Config());
  con.connect(function (err) {
      if (err) throw err;
      console.log('sikeresen le lett kérdezve a filmek');
  })
  con.query('select idfilmek,filmnev,filmdescription,filmhossz,filmkorhatár,film_KategoriaId,film_keplink from filmek', (err, result) => {
      if (err) res.status(404).send({ status: 404, error: "Hiba a filmek lekérdezésekor" });
      res.send(result);
  })
})

app.post('/kereses', (req, res) => {
    const kvalue = req.body.katvalue;
    var con = mysql.createConnection(new Config());

  con.connect(function (err) {
      if (err) throw err;
      console.log('Successfully connected to the database');
  });

  if (kvalue == "0") {
      console.log('No category ID specified');
      con.query('SELECT idfilmek, filmnev, filmdescription, filmhossz, filmkorhatár, film_KategoriaId, film_keplink FROM filmek INNER JOIN kategoria ON filmek.film_KategoriaId = kategoria.KategoriaId', (err, result) => {
          if (err) {
              res.status(404).send({ status: 404, error: "Error querying films with category" });
          } else {
              res.send(result);
          }
      });
  } else {
      console.log('Category ID specified');
      con.query('SELECT idfilmek, filmnev, filmdescription, filmhossz, filmkorhatár, film_KategoriaId, film_keplink FROM filmek INNER JOIN kategoria ON filmek.film_KategoriaId = kategoria.KategoriaId WHERE KategoriaId LIKE ?', [kvalue], (err, result) => {
          if (err) {
              res.status(404).send({ status: 404, error: "Error querying films with category" });
          } else {
              res.send(result);
          }
      });
  }

  con.end(); // Close the database connection
})














app.listen(port, () => {
    console.log(`Példa alkalmazás publikálva ${port}-on`);
})