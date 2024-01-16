// OrderModel.js

const OrderModel = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // The name of the referenced model (it should be the same as the model name in define())
                key: 'id', // The name of the referenced column in the referenced model
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    });

    Orders.associate = (models) => {
        Orders.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        
        Orders.hasMany(models.PurchasedItems, {
            foreignKey: 'orderId',
        });
    };
    return Orders;
};

export default OrderModel;
