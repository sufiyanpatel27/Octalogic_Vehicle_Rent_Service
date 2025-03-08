const sequelize = require('./config/db');
const VehicleType = require('./models/VehicleType');
const Vehicle = require('./models/Vehicle');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const hatchback = await VehicleType.create({ name: 'Hatchback', wheels: 4 });
    const suv = await VehicleType.create({ name: 'SUV', wheels: 4 });
    const sedan = await VehicleType.create({ name: 'Sedan', wheels: 4 });
    const cruiser = await VehicleType.create({ name: 'Cruiser', wheels: 2 });

    await Vehicle.bulkCreate([
        { name: 'Toyota Yaris', typeId: hatchback.id },
        { name: 'Ford Ecosport', typeId: suv.id },
        { name: 'Honda Civic', typeId: sedan.id },
        { name: 'Harley Davidson', typeId: cruiser.id }
    ]);

    console.log('Database seeded');
};

seedDatabase();
