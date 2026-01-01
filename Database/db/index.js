const { drizzle } = require('drizzle-orm/node-postgres')

const db = drizzle("postgres://postgres://Pranav@localhost:5432/mydb")

module.exports = db;