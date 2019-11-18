const express = require('express')
const router = express.Router()
const contactsController = require('../app/controllers/contactsController')
const userAuthenticationController= require('../app/controllers/usersAuthenticationController')
const userAuthentication=require('../app/middlewares/authentication')

router.get('/contacts',userAuthentication, contactsController.list)
router.post('/contacts',userAuthentication, contactsController.create)
router.get('/contacts/:id',userAuthentication, contactsController.show)
router.put('/contacts/:id', userAuthentication,contactsController.update)
router.delete('/contacts/:id', userAuthentication,contactsController.destroy)

router.post('/users/register',userAuthenticationController.register)
router.post('/users/login',userAuthenticationController.login)
router.get('/users/account',userAuthentication,userAuthenticationController.account)
router.delete('/users/logout',userAuthentication,userAuthenticationController.logout)
module.exports = router 