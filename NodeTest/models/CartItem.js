
const CartItemModel = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems', {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return CartItems;
};

export default CartItemModel;
