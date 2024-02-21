// const fs = require('fs')
// import swal from 'sweetalert';
const swal = require("sweetalert");
const {
    runQuery,
    s_users,
    insertUser_query,
    del_users,
} = require("../model/getQuery");
const getConnection = require("../../connect");

const homefun = (req, res) => {
    res.send("Home Page");
};

const list = (req, res) => {
    res.send("list page");
};

const createUser = async (req, res) => {
    const regexFullname = /[A-Za-z]\s[A-Za-z]/;
    const regexContact = /[0-9]{10,12}/;
    const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
    const userDetails = {
        username: req.body.username,
        fullname: req.body.fullname,
        contact: req.body.contact,
        email: req.body.email,
    };
    try {
        if (req.body.username.length < 3) {
            res
                .status(200)
                .json({ message: "Invalid username: cannot be less than 3" });
        } else if (!regexFullname.test(req.body.fullname)) {
            res
                .status(200)
                .json({ message: "Invalid fullname: must show first and last names" });
        } else if (!regexContact.test(req.body.contact)) {
            res
                .status(200)
                .json({
                    message:
                        "Invalid contact: must be a number, between 10 and 12 digits",
                });
        } else if (!regexEmail.test(req.body.email)) {
            res.status(200).json({ message: "Invalid email" });
        } else {
            const rest = await addUser(userDetails);
            if (rest.errno == 1062) {
                res.status(200).json({ message: "Duplicate entry detected" });
            } else {
                res.status(200).json({ message: "Successful" });
            }
        }
    } catch (error) {
        res.status(200).json({ error });
    }
};

const addUser = async (data) => {
    const connection = await getConnection();
    try {
        const result = await runQuery(connection, insertUser_query, [
            data.username,
            data.fullname,
            data.contact,
            data.email,
        ]);
        return result;
    } catch (err) {
        return err;
    }
};

const showUsers = async (req, res) => {
    const connection = await getConnection();
    try {
        const result = await runQuery(connection, s_users);
        res.json(result);
    } catch (err) {
        return err;
    }
};

const deleteUsers = async (req, res) => {
    const connection = await getConnection();
    try {
        const result = await runQuery(connection, del_users);
        console.log(result);
        res.json(result);
    } catch (err) {
        return err;
    }
};
module.exports = { homefun, list, createUser, showUsers, deleteUsers };

// ********************************************************************************************************
// const homefun = (req, res) => {
//     res.send("Home Page");
// }

// const list = (req, res) => {
//     res.send("list page");
// }

// const fs = require('fs');
// const { pool, s_users, insertUser_query } = require('../model/getPool')
// const homefun = (req, res) => {
//     res.send("Home Page");
// }
// const list = (req, res) => {
//     res.send("list page");
// }
// const createUser = async (req, res) => {
//     const userDetails = {
//         fullname: req.body.fullname,
//         contact: req.body.contact,
//         username: req.body.username,
//         email: req.body.email,
//     }
//     console.log(req.body.username)
//     try {
//         const rest = await addUser(userDetails)
//         res.status(200).json(rest)
//     } catch (err) {
//         res.status(200).json(rest)
//     }
// }
// const showUsers = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             res.send("error connecting to database")
//             console.log(err);
//             return;
//         }
//         connection.query(s_users, (err, result) => {
//             connection.release();
//             if (err) throw err;
//             res.json(result);
//         })
//     })
// }

// function getConnection(){
//     return new Promise((resolve,reject)=>{
// pool.getConnection((err,connection)=>{
//     if(err){
//         reject(err)
//     }else{
//         resolve(connection)
//     }
// })
//     })
// }
// function runQuery(connection,sql_query,values){
//     return new Promise((resolve,reject)=>{
// connection.query(sql_query,values,(err,result)=>{
//     if(err){
//         reject(err)
//     }else{
//         resolve(result)
//     }
// })
//     })
// }
// const addUser =async (data)=>{
// const connection = await getConnection();
// try{
// const result = await runQuery(connection,insertUser_query,[data.username, data.fullname, data.contact, data.email])
// console.log(result)
// return  result
// }
// catch(err){
//     return err
// }
// }
// module.exports = { homefun, list, createUser, showUsers }

// const addUser = (data) =>{
//     console.log(data);
//     pool.getConnection((err,connection)=>{
//         if (err) {
//            return err
//         }
//         connection.query(insertUser_query,[data.username,data.fullname,data.contact,data.email],(err,result)=>{
//             connection.release();
//             if(err){
//                 console.log(err)
//             return err
//             }
//            return result
//         })
//     })
// }

// const showUsers= (req,res)=>{
//     pool.getConnection((err,connection)=>{
//         if(err){
//             res.send("error connecting to database")
//             console.log(err);
//             return;
//         }
//     connection.query(s_users,(err,result)=>{
//         connection.release();
//         if(err) throw err;
//         res.json(result);
//     })
//     })
// }
