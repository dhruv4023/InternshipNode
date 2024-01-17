

const PurchasedItemsModel = (sequelize, DataTypes) => {
    const PurchasedItems = sequelize.define('PurchasedItems', {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    return PurchasedItems;
};

export default PurchasedItemsModel;
