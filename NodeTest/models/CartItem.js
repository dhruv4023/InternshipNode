
const CartItemModel = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems', {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return CartItems;
};

export default CartItemModel;
