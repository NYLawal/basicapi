const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit:10,   
    host:'localhost',
    user:'root',
    password:'',
    database:'user_database'
})

function getConnection(){
    return new Promise((resolve,reject)=>{
pool.getConnection((err,connection)=>{
    if(err){
        reject(err)
    }else{
        resolve(connection)
    }
})
    })
}
module.exports = getConnection


// connect.getConnection((err)=>{
    //     if(err){
    //         res.send("error connecting to database")
    //         console.log(err);
    //         return;
    //     }
    // })