const express = require('express');
const VehicleType = require('../models/VehicleType');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

router.get('/types', async (req, res) => {
    const types = await VehicleType.findAll();
    res.json(types);
});

router.get('/:typeId', async (req, res) => {
    const vehicles = await Vehicle.findAll({ where: { typeId: req.params.typeId } });
    res.json(vehicles);
});

module.exports = router;
