const express = require("express");
const cors = require("cors");

const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Rankify Backend is running"
    });
});

// Recommendation API
app.use("/api/recommendations", recommendationRoutes);

module.exports = app;