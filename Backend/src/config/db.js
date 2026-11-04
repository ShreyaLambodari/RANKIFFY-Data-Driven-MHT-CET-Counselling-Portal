const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "cet_predictor",

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log(" MySQL connected successfully");
        console.log(` Database: ${process.env.DB_NAME || "cet_predictor"}`);

        connection.release();

        return true;
    } catch (error) {
        console.error(" MySQL connection failed:");
        console.error(error.message);

        throw error;
    }
}

module.exports = {
    pool,
    testConnection
};