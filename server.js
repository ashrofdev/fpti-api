const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/users', (req, res)=>{
    db.select('*').from('users').then(data => {
        res.json(data)
    })
})
app.post('/submit-change', (req, res) => {
    db('users').where('userid', '=', req.body.id)
    .update({ m1: req.body.m1, m2: req.body.m2, m3: req.body.m3, m4: req.body.m4
    , m5: req.body.m5, m6: req.body.m6, m7: req.body.m7 }).then(user=>{
        res.json(user)
    }).catch(err=> res.json('unable to register'))
})

app.get('/password', (req, res)=>{
    db.select('*').from('password').then(data => {
        res.json(data)
    })
})

app.listen(process.env.PORT)
