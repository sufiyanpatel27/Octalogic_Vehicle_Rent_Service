const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./config/db');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const cors = require('cors');

const PORT = process.env.PORT

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/vehicles', vehicleRoutes);
app.use('/booking', bookingRoutes);


app.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log(`server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});