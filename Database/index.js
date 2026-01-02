const db = require('./db')

const { userTable } = require('./drizzle/schema')

async function insertUser({id,name,email}) {
    await db.insert(userTable).values({
        id,
        name,
        email
    })
    console.log('done')
}

insertUser({
    id:2,
    name:"pranav",
    email:"RamuKak"
}
)

async function getAllUsers() {
    const users = await db.select().from(userTable)
    console.log(users);
    return users;
}

getAllUsers()