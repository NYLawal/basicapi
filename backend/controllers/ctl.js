const fs = require('fs')
const {mysql,pool,s_users,insertUser_query, del_users} = require('../model/getPool')
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

const addUser = (data) =>{
    console.log(data);
    pool.getConnection((err,connection)=>{
        if (err) {
           return err
        } 
        connection.query(insertUser_query,[data.username,data.fullname,data.contact,data.email],(err,result)=>{
            connection.release();
            if(err){
                console.log(err)
            return err
            }
           return result
        })
    })
}


const showUsers=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err){
            res.send("error connecting to database")
            console.log(err);
            return;
        }
    connection.query(s_users,(err,result)=>{
        connection.release();
        if(err) throw err;
        res.json(result);
    })
    })  
}


const deleteUsers = (req,res) =>{
    pool.getConnection((err,connection)=>{
        if(err){
            res.send("error connecting to database")
            console.log(err);
            return;
        }
    connection.query(del_users, (err,result)=>{
        connection.release();
        if(err) throw err;
        res.json(result);
    })
    })  
}
module.exports = { homefun, list, createUser, showUsers, deleteUsers }






