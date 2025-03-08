const express = require('express');
const sequelize = require('./config/db');

const PORT = process.env.PORT

const app = express();


app.get('/', async (req, res) => {
    res.json(`server is running on port ${PORT}`);
});


app.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log(`server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});