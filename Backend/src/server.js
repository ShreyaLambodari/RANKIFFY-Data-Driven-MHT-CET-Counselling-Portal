require("dotenv").config();

const app = require("./app");
const { testConnection } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await testConnection();

        app.listen(PORT, () => {
            console.log(
                ` Rankify backend running on http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(" Failed to start Rankify backend");
        console.error(error.message);
        process.exit(1);
    }
}

startServer();