export default (sequelize, DataTypes) => {
    const PurchasedItemSchema = sequelize.define('purchased_item', {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    return PurchasedItemSchema;
};
