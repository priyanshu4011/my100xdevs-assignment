import { Pool } from 'pg'
const pool = new Pool({
  connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/postgres"
})

export { pool }
