// const express = require('express');
// const routerManager = express.Router();
// const {homefun,list,createUser} = require('../controllers/ctl')
// routerManager.get('/',homefun)
// routerManager.get('/list',list)
// routerManager.get('/register',createUser)


// module.exports={routerManager}

const express = require('express');
const routerManager = express.Router();
const {homefun,list,createUser,showUsers,deleteUsers} = require('../controllers/ctl')

routerManager.get('/',homefun)
routerManager.get('/list',list)
routerManager.post('/register',createUser);
routerManager.get('/showUsers',showUsers)
routerManager.delete('/delUsers',deleteUsers)

module.exports= routerManager
