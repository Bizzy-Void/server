const Pool = require("pg").Pool;

// connect
const db = new Pool ({
    user: "postgres",
    password: "bizzy19",
    port: "5432",
    host: "localhost",
    database: "perntodo"
});

module.exports = db;