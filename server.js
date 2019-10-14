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
let test = []

app.use(cors())
app.use(bodyParser.json())

app.get('/users', (req, res)=>{
    db.select('*').from('users').then(data => {
        res.json(data)
    })
})
app.get('/test', (req, res)=>{
    db.select('*').from('users').then(data => {
        res.json(test)
    })
})
app.post('/submit-change', (req, res) => {
    test.push(req.body)
    db.update('users').set('m1', '=', req.body.m1)
    .where('userid', '=', req.body.id).then(hope=>{
        res.json(hope)
    }).catch((errr)=>{res.json('failed.......')})
})

app.listen(process.env.PORT)
