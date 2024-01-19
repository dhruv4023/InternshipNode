export default (sequelize, DataTypes) => {
    const CartSchema = sequelize.define('carts', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
    });

    return CartSchema;
};
