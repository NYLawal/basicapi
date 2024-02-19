const express = require("express");
const mysql = require("mysql2");
const app = express();
const userRouter = require('./routes/userRouter')
// const {getUsers, addUsers} = require('./controllers/userController')

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Welcome to the Homepage")
})


app.use('/users', userRouter )

app.listen(3001, ()=>{
    console.log('server listening on port 3001');
})