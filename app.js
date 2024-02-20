
const express = require('express');
const app = express();
const cors = require('cors');
// const axios = require('axios');
const routerManager = require('./backend/routes/rts')
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use('/', routerManager);
app.post('/users/:id', (req, res) => {
  res.status(200).send(req.params.id);
})


app.listen(5000, function () {
    console.log("server running ")
})





