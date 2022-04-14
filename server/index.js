require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const gamesRouter = require('./routes/games.router');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/games', gamesRouter);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (e) {
        console.log(`Error before start`)
    }
}

start();
