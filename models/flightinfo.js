module.exports = function (sequelize, DataTypes) {
    return sequelize.define('flight', {
       airline: {
            type: DataTypes.STRING,
        },
        arrivalAirport: {
            type: DataTypes.STRING,
        },
        arrivalScheduledTime: {
            type: DataTypes.STRING,
        },
        arrivalActualTime: {
            type: DataTypes.STRING,
        },
        departureAirport: {
            type: DataTypes.STRING,
        },
        departureScheduledTime: {
            type: DataTypes.STRING,
        },
        departureActualTime: {
            type: DataTypes.STRING,
        },
        flightiataNumber: {
            type: DataTypes.STRING,
        }
    });
}