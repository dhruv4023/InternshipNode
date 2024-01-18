export default (sequelize, DataTypes) => {
    const Orders = sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    });

    return Orders;
};
