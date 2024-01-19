export default (sequelize, DataTypes) => {
    const OrderSchema = sequelize.define('orders', {
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

    return OrderSchema;
};
