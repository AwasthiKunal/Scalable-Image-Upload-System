const express = require("express");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/", uploadRoutes);

app.use((err, req, res, next) => {
    if (err.name === "MulterError") {
        return res.status(400).json({
            message: err.message,
        });
    }

    if (err) {
        return res.status(400).json({
            message: err.message || "Upload failed",
        });
    }

    return next();
});

module.exports = app;