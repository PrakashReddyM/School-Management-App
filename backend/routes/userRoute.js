const express = require('express')
const router = express.Router()
const {register,login,logout, getProfile} = require('../controllers/userController')
const isAuthenticated = require('../middleware/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/profile').get(isAuthenticated,getProfile)

module.exports = router