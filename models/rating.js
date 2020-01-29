module.exports = function (sequelize, DataTypes) {
    return sequelize.define('rating', {
        airline: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: DataTypes.INTEGER
    });
};