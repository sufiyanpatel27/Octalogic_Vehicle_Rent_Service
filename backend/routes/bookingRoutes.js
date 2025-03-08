const express = require('express');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');

const router = express.Router();

router.post('/', async (req, res) => {
    const { userName, vehicleId, startDate, endDate } = req.body;
    
    const existingBooking = await Booking.findOne({
        where: {
            vehicleId,
            [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } }
            ]
        }
    });

    if (existingBooking) {
        return res.status(400).json({ message: 'Vehicle is already booked for selected dates' });
    }

    await Booking.create({ userName, vehicleId, startDate, endDate });
    res.json({ message: 'Booking confirmed' });
});

module.exports = router;
