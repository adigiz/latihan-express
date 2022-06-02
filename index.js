const express = require('express')
const { handle } = require('express/lib/application')
const { restart } = require('nodemon')
const router = require('./router')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

app.use(router)
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
        res.render('index')
    })
app.get('/greeting', (req, res) => res.send('Selamat datang di bingle'))
app.get('/orders', (req, res) => res.send('Ini halaman order'))
app.get('/users', (req, res) => res.json([{ nama: "Giz", ttl: "01-01-01", gender: "laki-laki" }]))
app.get('/greet', (req, res) => {
    const name = req.query.name || 'nama'
    res.render('greet', { name })
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', (req, res) => {
    const { email, password } = req.body
    res.json([email, password])
})

const internalServerHandlerError = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: 'fail',
        errors: err.message
    })
}

const notFoundHandler = (req, res, next) => {
    return res.status(404).json({
        status: 'fail',
        errors: "Not Found"
    })
}

app.use(internalServerHandlerError)
app.use(notFoundHandler)



app.listen(port, () => console.log(`Example app listening at http: ${port}`))