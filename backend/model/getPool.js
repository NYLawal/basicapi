const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'user_database',
})

const s_users = "select * from user_table";
const insertUser_query = "insert into user_table (user_name,fullname,contact,email) VALUES(?,?,?,?)";
const del_users = "delete from user_table where user_name is null"

module.exports ={mysql,pool,s_users,insertUser_query,del_users}
