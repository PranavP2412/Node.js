const { pgTable, uuid, varchar, text,unique } = require('drizzle-orm/pg-core')

const authorTable = pgTable('author',{
    id:uuid().primaryKey().defaultRandom(),
    name:varchar({length:50}).notNull(),
    email: varchar({length:100}).unique().notNull()
})

module.exports = authorTable;