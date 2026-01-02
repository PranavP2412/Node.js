const { unique,pgTable, uuid, varchar, text } = require('drizzle-orm/pg-core')
const authorTable = require('./author.model')

const booksTable = pgTable('books',{
    id:uuid().primaryKey().defaultRandom(),
    title: varchar({length:100}).notNull(),
    discription:text(),
    authorID:uuid().references(()=>authorTable.id).notNull()
})

module.exports = booksTable;