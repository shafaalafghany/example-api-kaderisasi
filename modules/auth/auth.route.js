const router = require('express').Router()
const { createAccount, signIn } = require('./auth.controller')
const { checkBearer } = require('../../middleware/jwt.middleware')

router.post('/signin', signIn)
router.post('/', createAccount)

module.exports = router