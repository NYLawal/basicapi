const express = require ('express');
const router = express.Router()
const {showUsers, createUser} = require('../controllers/userController')


router.route('/').get(showUsers).post(createUser)

module.exports = router