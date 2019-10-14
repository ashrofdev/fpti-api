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

app.use(cors())
app.use(bodyParser.json())

app.get('/users', (req, res)=>{
    db.select('*').from('users').then(data => {
        res.json(data)
    })
})
app.post('/submit-change', (req, res) => {
    const { month } = req.body
    db.update('users').set('m1', '=', month.m1)
    .where('userid', '=', month.id).then(hope=>{
        res.json(hope)
    }).catch((errr)=>{res.json('failed.......')})
})

app.listen(process.env.PORT)
