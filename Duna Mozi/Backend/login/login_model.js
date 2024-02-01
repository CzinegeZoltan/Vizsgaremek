const mysql = require("mysql2");
const config = require("../App/config");
const jwt = require("jsonwebtoken");

function signin(req,res) {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("Töltsd ki az összes adatot!");
        }
        var con = mysql.createConnection(config.database);
        con.connect(function(err) {
            if (err) throw err; 
            console.log('sikeres csatlakozás');
        })
        const sql = 'call userLogin(?,?)';
        
        con.query(sql,[email,password], (err,result) =>{
            console.log(result);
            if (err) throw err;
            if (result[0].length > 0){
                const token = jwt.sign({
                    password: result[0][0].password,
                    email: result[0][0].email
                }, config.TokenKey,
                {
                    expiresIn:"2h",
                });    
                
                let alkalmazott = result[0][0];
                con.query('call UpdateToken(?,?)',[result[0][0].idalkalmazott,token],(err,result,fields)=>{
                    if (err) throw err;
                    alkalmazott.token = token;
                    res.send(alkalmazott);
                })
            }
            else{
                res.status(401).send("nem engedélyezett");
            }
            
        })


    } catch (error) {

    }
}

exports.signin = signin