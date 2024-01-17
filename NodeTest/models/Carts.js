// cartModel.js
const CartModel = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Carts', {
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

    return Cart;
};

export default CartModel;
