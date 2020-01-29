module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            is: /^(?=.*\d).{4,}$/i,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            is: /^(?=.*\d).{5,}$/i,
            }
        },
    });
};