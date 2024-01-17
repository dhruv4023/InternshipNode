// cartModel.js
const CartModel = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Carts', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Cart;
};

export default CartModel;
