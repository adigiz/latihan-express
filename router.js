const express = require('express')
const router = express.Router()

router.use(function timeLog(req, res, next) {
    console.log(`Time: ${Date.now()}`)
    next()
})

router.get('/profile', (req, res) => res.send('Halaman Profiles'))


module.exports = router