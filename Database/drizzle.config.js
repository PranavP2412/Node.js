const {defineConfig} = require("drizzle-kit")

const config = defineConfig({
    dialect:"postgresql",
    out:"./drizzle",
    schema:"./drizzle/schema.js",
    dbCredentials:{
        url:"postgres://postgres:Pranav@localhost:5432/mydb"
    },
});

module.exports = config;