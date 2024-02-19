const mysql = require("mysql2");

const connect = mysql.createPool({
    connectionLimit:10,   
    host:'localhost',
    user:'root',
    password:'',
    database:'user_database'
   })

   connect.getConnection((err)=>{
    if(err){
        res.send("error connecting to database")
        console.log(err);
        return;
    }

})
module.exports = connect