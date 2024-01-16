// purchasedItemsModel.js

const PurchasedItemsModel = (sequelize, DataTypes) => {
    const PurchasedItems = sequelize.define('PurchasedItems', {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'Products', // The name of the referenced model (Products)
            //     key: 'id', // The name of the referenced column in the Products table
            // },
            // onUpdate: 'CASCADE',
            // onDelete: 'CASCADE',
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'Orders', // The name of the referenced model (Orders)
            //     key: 'id', // The name of the referenced column in the Orders table
            // },
            // onUpdate: 'CASCADE',
            // onDelete: 'CASCADE',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    // PurchasedItems.associate = (models) => {
    //     PurchasedItems.belongsTo(models.Products, {
    //         foreignKey: 'productId',
    //         onDelete: 'CASCADE',
    //     });

    //     PurchasedItems.belongsTo(models.Orders, {
    //         foreignKey: 'orderId',
    //         onDelete: 'CASCADE',
    //     });
    // };
    return PurchasedItems;
};

export default PurchasedItemsModel;
