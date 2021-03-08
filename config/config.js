require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres"
  },
  test: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres"
  }
}
