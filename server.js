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
    const sql = `'UPDATE users SET mi = ${req.body.m1} WHERE userid = ${req.body.id}`
    db.query(sql, (err, result)=>{
        if (err) {
            res.json(err)
        }
        res.json(result)
    })
})

app.listen(process.env.PORT)
