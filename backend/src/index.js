const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');
const todoRoutes = require('./routes/todos');

const app = express()
const port = process.env.PORT || 4000

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
})

app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
  req.pool = pool
  next()
})

app.use('/api/todos', todoRoutes)

app.listen(port, () => {
  console.log(`Backend démarré sur le port ${port}`)
})
