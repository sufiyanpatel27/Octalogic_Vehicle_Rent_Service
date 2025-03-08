const express = require('express');

const PORT = 5000

const app = express();


app.get('/', async (req, res) => {
    res.json(`server is running on port ${PORT}`);
});


app.listen(PORT, async () => {
    console.log(`server is running on port ${PORT}`);
});