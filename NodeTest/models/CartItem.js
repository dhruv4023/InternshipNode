
const CartItemModel = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems', {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts', // The name of the referenced model (Products)
                key: 'id', // The name of the referenced column in the Products table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // The name of the referenced model (Products)
                key: 'id', // The name of the referenced column in the Products table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Add other attributes as needed
    });

    CartItems.associate = (models) => {
        CartItems.belongsTo(models.Carts, {
            foreignKey: 'cartId',
            onDelete: 'CASCADE',
        });

        CartItems.belongsTo(models.Products, {
            foreignKey: 'productId',
            onDelete: 'CASCADE',
        });
    };

    return CartItems;
};

export default CartItemModel;
