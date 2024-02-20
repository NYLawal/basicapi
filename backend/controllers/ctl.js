// const fs = require('fs')
// import swal from 'sweetalert';
const swal = require('sweetalert')
const {runQuery,s_users,insertUser_query, del_users} = require('../model/getQuery')
const getConnection = require('../../connect')

const homefun = (req, res) => {
    res.send("Home Page");
}

const list = (req, res) => {
    res.send("list page");
}



const createUser = (req, res) => {
    const userDetails = { 
        username: req.body.username, 
        fullname: req.body.fullname, 
        contact: req.body.contact, 
        email: req.body.email, 
    }
    const rest = addUser(userDetails)
    res.status(200).json({msg:"successfully inserted"})
}

const addUser = async (data)=>{
    const connection = await getConnection();
    try{
    const result = await runQuery(connection,insertUser_query,[data.username, data.fullname, data.contact, data.email])
    // console.log(result)
    return  result
    }
    catch(err){
        return err
    }
    }
    

const showUsers= async(req,res)=>{
    const connection = await getConnection();
    try{
        const result = await runQuery(connection,s_users)
        // console.log(result)
        res.json(result);
    }
    catch(err){
        return err
    }
}

const deleteUsers = async(req,res) =>{
    const connection = await getConnection();
    try{
        const result = await runQuery(connection,del_users)
        console.log(result)
        res.json(result);
    }
    catch(err){
        return err
    }
}
module.exports = { homefun, list, createUser, showUsers, deleteUsers }


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



