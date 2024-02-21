// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     connectionLimit:10,
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'user_database',
// })

const s_users = "select * from user_table";
const insertUser_query = "insert into user_table (username,fullname,contact,email) VALUES(?,?,?,?)";
const del_users = "delete from user_table where user_name is null"



function runQuery(connection,sql_query,values){
    return new Promise((resolve,reject)=>{
connection.query(sql_query,values,(err,result)=>{
    if(err){
        reject(err)
    }else{
        resolve(result)
    }
})
    })
}

module.exports = {runQuery,s_users,insertUser_query, del_users}
