module.exports = class Config {
    user =  "root";
    password = "";
    database = "dunamozi";
    host = "localhost";
    constructor() {
        return {host:this.host, user:this.user, password: this.password, database:this.database};
    }
};