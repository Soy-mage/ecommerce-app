// you dont really need this file

import pg from 'pg'
const { Pool, Client } = pg
 
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'products',
})
 
// console.log(await pool.query('SELECT NOW()'))
 
const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'products',
})
 
await client.connect()
 
console.log(await client.query('SELECT * FROM users'))
 
await client.end()