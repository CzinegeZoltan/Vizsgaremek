const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Config = require('../App/config');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');

// const session = require('express-session');

// app.use(session({
//     secret: '',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

const Key = 'kulcs';

//id raktározás
const { felhIDraktarozas, felhIDlekeres, felhIDtorles } = require('./auth.js');

//token tárolás
const { felhTOKENraktarozas, felhTOKENlekeres, felhTOKENtorles } = require('./authToken.js');

app.use(cors({ origin: '*' })); //CORS Betöltés
app.use(express.json()); //POST kérésekben body elérése
app.use(bodyParser.json());

app.get('/', (req, res) => { //Szerver futási teszt
  res.send("<h1>Szerver fut</h1>")
})

app.get('/user', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a user csatlakozás');
    })
    con.query('select idalkalmazott,alkalmazottNev,jelszo,email from alkalmazott', (err, result) => {
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
 
            const ID = result[0][0].idalkalmazott
 
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
                res.status(200).json({ userID:ID, status: 'success', message: 'Sikeres bejelentkezés', admin:0, redirection:"alkalmazott.html"});
                console.log("Dolgozó");
                break;
              case 1:
                res.status(200).json({ userID:ID, status: 'success', message: 'Sikeres bejelentkezés', admin:1, redirection:"admin.html"});
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
    const userID = req.body.userID;
    console.log(userID);
 
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) {
            console.error('Hiba az adatbázishoz való kapcsolódáskor:', err);
            return res.status(500).send({ error: "Az adatbázishoz való kapcsolódás sikertelen." });
        }
        console.log('Sikeresen le lett kérdezve a userToken.');
 
        if (userID === null) {
            return res.status(404).send({ status:404, error: "Illetéktelen behatolás: Hiányzó felhasználói azonosító." });
        }
 
        con.query('SELECT token FROM alkalmazott WHERE idalkalmazott = ?', [userID], (err, result) => {
            if (err) {
                console.error('Hiba az adatbázis lekérdezése során:', err);
                return res.status(500).send({ error: "Hiba az adatbázis lekérdezése során." });
            }
   
            if (!result || result.length === 0) {
                return res.status(404).send({ error: "Felhasználóhoz nem található token." });
            }
   
            const token = result[0].token;
            jwt.verify(token, Key, (err, decoded) => {
                if (err) {
                    console.error('Token verifikálás sikertelen:', err.message);
                    if (err.name === 'TokenExpiredError') {
                        console.log('Elavult token');
                    }
                    return res.status(401).send({ error: "A token érvénytelen." });
                }
                console.log('A token valid eddig:', new Date(decoded.exp * 1000));
                res.send(result);
            });
        });
    });
 
   
});

app.post('/reg', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás a regre');
    })
        const userSQL = 'CALL `alkalmazottREG`(?,?,?)';
        con.query(userSQL, [req.body.name, req.body.password, req.body.email,0], (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send({ status: 404, error: "Hiba a user rögzítésekor" });
            } else {
                res.status(200).send({ status: 200, success: "Sikeres adatrögzítés"})
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
  con.query('select idfilmek,filmnev, film_keplink from filmek', (err, result) => {
      if (err) res.status(404).send({ status: 404, error: "Hiba a filmek lekérdezésekor" });
      res.send(result);
  })
})

app.post('/filmekinfo', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a filmekinfo');
    })

    const sql = "CALL filmINFO(?)";
    con.query(sql,[req.body.id], (err, result) => {
        if (err) res.status(404).send({ status: 404, error: "Hiba a filmINFO lekérdezésekor" });
        res.send(result[0]);
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
      con.query('SELECT idfilmek, film_keplink FROM filmek INNER JOIN kategoria ON filmek.film_KategoriaId = kategoria.KategoriaId', (err, result) => {
          if (err) {
              res.status(404).send({ status: 404, error: "Hiba a filmek kategóriával történő lekérdezésekor" });
          } else {
              res.send(result);
          }
      });
  } else {
      console.log('Kategória ID van');
      con.query('SELECT idfilmek, film_keplink FROM filmek INNER JOIN kategoria ON filmek.film_KategoriaId = kategoria.KategoriaId WHERE KategoriaId LIKE ?', [kvalue], (err, result) => {
          if (err) {
              res.status(404).send({ status: 404, error: "Hiba a filmek kategóriával történő lekérdezésekor" });
          } else {
              res.send(result);
          }
      });
  }

  con.end();
})

app.post('/szovegkeres', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
      if (err) throw err;
      console.log('sikeresen le lett kérdezve a filmek szövegesen');
    })

    const sql='CALL szovegKeres(?)'
    con.query(sql,[req.body.name], (err, result) => {
        if (err) res.status(404).send({ status: 404, error: "Hiba a filmek lekérdezésekor névvel" });
        res.send(result[0]);
    })
  con.end();
});

app.put('/usermod', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection: USERMOD');
    });

    const userSQL = 'CALL alkalmazottMOD(?,?,?,?)';
    con.query(userSQL, [req.body.name, req.body.password, req.body.email, req.body.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Error modifying user" });
        } else {
            res.status(200).send({ status: 200, success: "Successful user modification" });
        }
    });
});

app.delete('/usertor', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection: USERTOR');
    });

    const userSQL = 'CALL alkalmazottTOR(?)';
    con.query(userSQL, [req.body.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Error deleting user" });
        } else {
            res.status(200).send({ status: 200, success: "Successful user deletion" });
        }
    });
});

app.post('/filmreg', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás a filmREGRE');
    })
        const userSQL = 'CALL filmREG(?,?,?,?,?,?,?)';
        con.query(userSQL, [req.body.name,req.body.szereplok,req.body.desription, req.body.hossz, req.body.korhatar, req.body.kategoria, req.body.link], (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send({ status: 404, error: "Hiba a film rögzítésekor" });
            } else {
                res.status(200).send({ status: 200, success: "Sikeres film adatrögzítés" })
            }
        })
});

app.put('/filmmod', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection to FILMMOD');
    });

    const filmSQL = 'CALL filmMOD(?,?,?,?,?,?,?,?)';
    con.query(filmSQL, [req.body.name, req.body.szereplok, req.body.description, req.body.hossz, req.body.korhatar, req.body.kategoria, req.body.link, req.body.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Error modifying film data" });
        } else {
            res.status(200).send({ status: 200, success: "Successful film data modification" });
        }
    });
});

app.delete('/filmtor', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection: FILMTOR');
    });

    const filmSQL = 'CALL filmTOR(?)';
    con.query(filmSQL, [req.body.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Error deleting film" });
        } else {
            res.status(200).send({ status: 200, success: "Successful film deletion" });
        }
    });
});

app.get('/vetitesek', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a vetítések');
    })
    const sql = 'CALL vetitesek();'
    con.query(sql, (err, result) => {
        if (err) res.status(404).send({ status: 404, error: "Hiba a vetítések lekérdezésekor" });
        res.send(result[0]);
    })
})

app.get('/vetitesekfel', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a vetítésekFELSOROL');
    })

    const sql = 'CALL vetitesFELSOROL();'
    con.query(sql, (err, result) => {
        if (err) res.status(404).send({ status: 404, error: "Hiba a vetítések lekérdezésekor" });
        res.send(result[0]);
    })
})

app.post('/vetitesekinfo', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) {
            console.error('Hiba az adatbázishoz való kapcsolódás során:', err);
            res.status(500).send({ status: 500, error: "Hiba az adatbázishoz való kapcsolódás során" });
            return;
        }
        
        console.log('Sikeresen kapcsolódva az adatbázishoz');
        
        const sql = 'CALL vetitesINFO(?)';
        con.query(sql, [req.body.id], (err, result) => {
            if (err) {
                console.error('Hiba a lekérdezés során:', err);
                res.status(500).send({ status: 500, error: "Hiba a lekérdezés során" });
                return;
            }
            
            console.log('Sikeres lekérdezés a vetítések INFO-ról');
            res.send(result[0]);
        });

        con.end(function(err) {
            if (err) {
                console.error('Hiba az adatbáziskapcsolat bezárása során:', err);
            } else {
                console.log('Adatbáziskapcsolat sikeresen lezárva');
            }
        });
    });
});

app.post('/szekek', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) {
            console.error('Hiba az adatbázishoz való kapcsolódás során:', err);
            res.status(500).send({ status: 500, error: "Hiba az adatbázishoz való kapcsolódás során" });
            return;
        }
        
        console.log('Sikeresen kapcsolódva az adatbázishoz');
        
        const sql = 'CALL vetitesULESEK(?)';
        con.query(sql, [req.body.id], (err, result) => {
            if (err) {
                console.error('Hiba a lekérdezés során:', err);
                res.status(500).send({ status: 500, error: "Hiba a lekérdezés során" });
                return;
            }
            
            console.log('Sikeres lekérdezés a székekről');
            res.send(result[0]);
            
            con.end(function(err) {
                if (err) {
                    console.error('Hiba az adatbáziskapcsolat bezárása során:', err);
                } else {
                    console.log('Adatbáziskapcsolat sikeresen lezárva');
                }
            });
        });
    });
});

app.post('/vetitesreg', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás a vetitesREGRE');
    })
        const userSQL = 'CALL vetitesREG(?,?,?)';
        con.query(userSQL, [req.body.date, req.body.terem, req.body.film], (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send({ status: 404, error: "Hiba a film rögzítésekor" });
            } else {
                res.status(200).send({ status: 200, success: "Sikeres vetites adatrögzítés" })
            }
        })

        const newvetites = 'SELECT idVetitesek as valamiid, Vetites_idVetitoTerem AS teremszam FROM vetitesek WHERE idVetitesek = (SELECT MAX(idVetitesek) FROM vetitesek)';
        con.query(newvetites,(err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send({ status: 404, error: "Hiba a film rögzítésekor" });
            } else{
                const MAXid = result[0].valamiid;
                const MAXterem = result[0].teremszam;

                if(MAXterem == 1){
                    const ulesREG1 = 'CALL ulesREG1(?)';
                    con.query(ulesREG1,[MAXid], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(404).send({ status: 404, error: "Hiba az 1-es terem ülések rögzítésekor" });
                        } else {
                            console.log("Sikeres 1-es terem ülések adatrögzítés")
                        }
                    })
                } else if(MAXterem == 2){
                    const ulesREG2 = 'CALL ulesREG2(?)';
                    con.query(ulesREG2,[MAXid], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(404).send({ status: 404, error: "Hiba az 2-es terem ülések rögzítésekor" });
                        } else {
                            console.log("Sikeres 2-es terem ülések adatrögzítés")
                        }
                    })
                } else if(MAXterem == 3){
                    const ulesREG3 = 'CALL ulesREG3(?)';
                    con.query(ulesREG3,[MAXid], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(404).send({ status: 404, error: "Hiba az 3-as terem ülések rögzítésekor" });
                        } else {
                            console.log("Sikeres 3-as terem ülések adatrögzítés")
                        }
                    })
                } else if(MAXterem == 4){
                    const ulesREG4 = 'CALL ulesREG4(?)';
                    con.query(ulesREG4,[MAXid], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(404).send({ status: 404, error: "Hiba az 4-es terem ülések rögzítésekor" });
                        } else {
                            console.log("Sikeres 4-es terem ülések adatrögzítés")
                        }
                    })
                } else {
                    console.log("Nincs ilyen terem: " + MAXterem);
                }
            }
        })
});

app.put('/vetitesmod', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection to vetitesMOD');
    });

    const vetitesSQL = 'CALL vetitesMOD(?,?,?)';
    con.query(vetitesSQL, [req.body.datum, req.body.filmid, req.body.vetitesid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Sikertelen módosítás" });
        } else {
            res.status(200).send({ status: 200, success: "Sikeres adat módosítás" });
        }
    });
});

app.delete('/vetitestor', (req, res) => {
    var con = mysql.createConnection(new Config());
    
    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection to vetitesTORRE');
    });
    
    const vetitesSQL = 'CALL vetitesTOR(?)';
    con.query(vetitesSQL, [req.body.vetitesid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Error deleting screening" });
        } else {
            const ulestorL = 'CALL ulesTOR(?)';
            con.query(ulestorL, [req.body.vetitesid], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).send({ status: 404, error: "Error deleting seats" });
                } else {
                    console.log("Seats deleted successfully");
                }
            });
            
            res.status(200).send({ status: 200, success: "Successful screening deletion" });
        }
    });
});

app.post('/ulesfoglal', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás az ülésfoglalásra');
    })
        const idArray = req.body.ulesek
        const ulesfoglalSQL = 'CALL ulesFOGLAL(?)';

        idArray.forEach(id => {
            con.query(ulesfoglalSQL, id, (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(404).send({ status: 404, error: "Hiba az ülés rögzítésekor" });
                } else {
                    console.log(`ID ${id} sikeres frissítve`);
                }
            });
        });
        res.status(200).send({ status: 200, success: "Sikeres ülés foglalás" });
});

app.get('/jegyek', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a jegyek');
    })
    const sql = 'CALL jegyekLEK();'
    con.query(sql, (err, result) => {
        if (err) res.status(404).send({ status: 404, error: "Hiba a vetítések lekérdezésekor" });
        res.send(result[0]);
    })
})

app.post('/jegyvasar', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás az ülésfoglalásra');
    })
        const vasarlassql = 'CALL jegyVASARLAS(?,?,?,?,?)';

        con.query(vasarlassql, [req.body.email,req.body.vetitesid,req.body.ulesek,req.body.arosszeg,req.body.jegyek], (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send({ status: 404, error: "Hiba a vásárlás közben" });
            } else {
                console.log(`sikeres vásárlás`);
            }
        });

        let maxid = 0;

        const newvasarlas = 'SELECT vasarlasid FROM vasarlasok WHERE vasarlasid = (SELECT MAX(vasarlasid) FROM vasarlasok)';
        con.query(newvasarlas, (err, result) => {
            if (err) res.status(404).send({ status: 404, error: "Hiba a székek lekérdezésekor" });
            maxid = result[0].vasarlasid
            console.log(maxid)
        })

        //létrehozzuk a node mailer csomagot
        const transporter = nodeMailer.createTransport({
            service: "Gmail",
            host:'smtp.gmail.com',
            port: 456,
            secure: true,
            auth: {
                user: 'duna.mozi2@gmail.com',
                pass: 'jgvs wepu zxfq bbhl'
            }
        });


        const mailOptions = {
            from: 'duna.mozi2@gmail.com',
            to: req.body.email,
            subject: "Megvásárolt jegyek",
            html: req.body.uzenet,
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
                res.status(500).send({ error: 'Nem sikerült elküldeni az e-mailt' });
            } else {
                console.log('Email elküldve:', info.response);
                res.status(200).send({ status: 200, success: "Sikeres email elküldése" });
            }
          });
});

app.get('/esemenyek', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve a vetítések');
    })
    const sql = 'CALL esemenyek();'
    con.query(sql, (err, result) => {
        if (err) res.status(404).send({ status: 404, error: "Hiba a vetítések lekérdezésekor" });
        res.send(result[0]);
    })
})

app.post('/esemenyekfilmek', (req, res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeresen le lett kérdezve az esemenyekinfo');
    })

    const sql = "CALL esemenyekFILMEK(?)";
    con.query(sql,[req.body.id], (err, result) => {
        if (err) res.status(404).send({ status: 404, error: "Hiba a filmINFO lekérdezésekor" });
        res.send(result[0]);
    })
})

app.post('/esemenyekreg', (req, res) => {
    var con = mysql.createConnection(new Config());

    con.connect(function (err) {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log('Connected to database');
    });

    const esemenyreg = "CALL esemenyREG(?,?,?)";
    con.query(esemenyreg, [req.body.nev, req.body.idopont, req.body.keplink], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send({ status: 500, error: "Failed to insert data" });
            return;
        }

        con.query("SELECT LAST_INSERT_ID() as lastID", (err, result) => {
            if (err) {
                console.error('Error getting last inserted ID:', err);
                res.status(500).send({ status: 500, error: "Failed to retrieve last inserted ID" });
                return;
            }

            const esemnyid = result[0].lastID;
            console.log('Last inserted ID:', esemnyid);

            const idArray = req.body.filmid;

            const osszekoto = 'CALL esemenyFILMinsert(?,?)';

            idArray.forEach(id => {
                con.query(osszekoto, [esemnyid, id], (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(404).send({ status: 404, error: "Hiba az ülés rögzítésekor" });
                    } else {
                        console.log(`Film ID ${id} successfully inserted for event ID ${esemnyid}`);
                    }
                });
            });

            con.end(function (err) {
                if (err) {
                    console.error('Error closing database connection:', err);
                    return;
                }
            });


            res.status(200).send({ status: 200, success: "Sikeres vetites adatrögzítés" });
        });
    });
});

app.put('/esemenymod', (req, res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection to esemenyMOD');
    });

    const esemenySQL = 'CALL esemenyMOD(?,?,?,?)';
    con.query(esemenySQL, [req.body.nev, req.body.idopont, req.body.keplink, req.body.eid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Error modifying event data" });
        } else {
            res.status(200).send({ status: 200, success: "Successful event data modification" });
        }
    });
});

app.delete('/esemenytor', (req, res) => {
    const eid = req.params.id;
    var con = mysql.createConnection(new Config());

    con.connect(function (err) {
        if (err) throw err;
        console.log('Successful connection to eseményTORRE');
    });

    const esemenySQL = 'CALL esemenyTOR(?)';
    con.query(esemenySQL, eid, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ status: 404, error: "Error deleting event" });
        } else {
            const osszekototorol = 'CALL osszekotoTOR(?)';
            con.query(osszekototorol, eid, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).send({ status: 404, error: "Error deleting connections" });
                } else {
                    console.log("Successfully deleted associated connections");
                }
            });

            res.status(200).send({ status: 200, success: "Successful event deletion" });
        }
    });
});

app.get('/kilep', (req, res) => {
 
    function kilep(err){
        console.log('sikeres kijelentkezés');
   
        if (err) {
            console.log(err)
            res.status(404).send({ status: 404, error: "Hiba kijelentkezéskor"});
        } else {
            res.status(200).send({ status: 200, success: "Sikeres kijelentkezés", redirection:"bejel.html"})
        }
    }
    kilep();
});

app.listen(port, () => {
    console.log(`Példa alkalmazás publikálva ${port}-on`);
})