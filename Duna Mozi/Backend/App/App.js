const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Config = require('../App/config');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const jwt = require("jsonwebtoken");

const Key = 'kulcs';

const { felhIDraktarozas, felhIDlekeres, felhIDtorles } = require('./auth.js');

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

    const sql = 'call userLogin(?,?)';
        
    con.query(sql,[req.body.email,req.body.password], (err,result) =>{
        if (err) throw err;
        if (result[0].length > 0){
            let alkalmazott = result[0][0];

            felhIDraktarozas(result[0][0].idalkalmazott);

            const jasonba1 = {
                id: result[0][0].idalkalmazott,
                email: result[0][0].email
            } 
            const options = {
                expiresIn:"2h",
            }
            const token = jwt.sign(jasonba1, Key, options);

            con.query('call UpdateToken(?,?)',[result[0][0].idalkalmazott,token],(err,result,fields)=>{
                if (err) throw err;
                alkalmazott.token = token;
            });
            const userRole = result[0][0].admin;
            switch (userRole) {
              case 0:
                res.status(200).json({ status: 'success', message: 'Sikeres bejelentkezés', admin:0, redirection:"alkalmazott.html"});
                console.log("Dolgozó");
                break; 
              case 1:
                res.status(200).json({ status: 'success', message: 'Sikeres bejelentkezés', admin:1, redirection:"admin.html"});
                console.log("Admin")
                break;
              default:
                res.status(404).json({ status: 'error', message: 'Sikertelen bejelentkezés'});
                console.log("Sikertelen bejelentkezés")
                break;
            }

            jwt.verify(token, Key, (err, decoded) => {
                if (err) {
                  // Token verifikálása sikertelen (már nem érvényes vagy nem valid)
                  console.error('Nem sikerült verifikálni a tokent:', err.message);
                } else {
                  console.log('Valid:', new Date(decoded.exp * 1000));
                }
              });
        }
        else{
            res.status(401).send("nem engedélyezett belépés");
        }
    })
});

app.post('/userToken', (req, res) => {
    const userID = felhIDlekeres();
    console.log(userID);
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a token');
    })
    con.query('select token from alkalmazott WHERE idalkalmazott = ?',[userID], (err, result) => {
        const token = result[0].token;
        jwt.verify(token, Key, (err, decoded) => {
            if (err) {
              console.error('Token verifikálás sikertelen:', err.message);
              if (err.name === 'TokenExpiredError') {
                console.log('Elavult token');
              }
            } else {
              console.log('A token valid eddig:', new Date(decoded.exp * 1000));
              res.send(result);
            }
          });        
    })
})

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
      console.log('Sikeres csatlakozás az adatbázishoz');
  });

  if (kvalue == "0") {
      console.log('Kategória ID nincs');
      con.query('SELECT idfilmek, filmnev, filmdescription, filmhossz, filmkorhatár, film_KategoriaId, film_keplink FROM filmek INNER JOIN kategoria ON filmek.film_KategoriaId = kategoria.KategoriaId', (err, result) => {
          if (err) {
              res.status(404).send({ status: 404, error: "Error querying films with category" });
          } else {
              res.send(result);
          }
      });
  } else {
      console.log('Kategória ID van');
      con.query('SELECT idfilmek, filmnev, filmdescription, filmhossz, filmkorhatár, film_KategoriaId, film_keplink FROM filmek INNER JOIN kategoria ON filmek.film_KategoriaId = kategoria.KategoriaId WHERE KategoriaId LIKE ?', [kvalue], (err, result) => {
          if (err) {
              res.status(404).send({ status: 404, error: "Error querying films with category" });
          } else {
              res.send(result);
          }
      });
  }

  con.end(); // Bezárjuk az adatbázist
})

app.post('/usermod', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás: USERMOD');
    })
        const userSQL = 'UPDATE alkalmazott SET `alkalmazottNev` = ?,jelszo = ?, email = ? Where idalkalmazott = ?';
        con.query(userSQL, [req.body.name, req.body.password, req.body.email,req.body.id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send({ status: 404, error: "Hiba a user módosításakor" });
            } else {
                res.status(200).send({ status: 200, success: "Sikeres user módosítás" })
            }
        })
});












app.listen(port, () => {
    console.log(`Példa alkalmazás publikálva ${port}-on`);
})