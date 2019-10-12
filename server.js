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




const users = [
    {
        username: 'Ashraf',
        fullName: 'Salman Ashraf',
        age: '18',
        phone: 08169094945,
        gender: 'male',
        regDate: '17-sep-19',
        id: 'NG303935'
    },
    {
        username: 'Daniel',
        regDate: '19-sep-19',
        fullName: 'Samuel Daniel',
        phone: 08168354675,
        age: '28',
        gender: 'male',
        id: 'NG335965'
    },
    {
        username: 'Mary',
        fullName: 'Olaiwola Mary',
        phone: 08165894385,
        regDate: '27-sep-19',
        age: '20',
        gender: 'female',
        id: 'NG204756'
    },
]

app.get('/users', (req, res)=>{
    res.json(users)
})

app.listen(process.env.PORT)