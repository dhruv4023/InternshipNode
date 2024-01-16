// cartModel.js
const CartModel = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Carts', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // The name of the referenced model (Users)
                key: 'id', // The name of the referenced column in the Users table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });

        Cart.belongsTo(models.Products, {
            foreignKey: 'productId',
            onDelete: 'CASCADE',
        });

        Cart.hasMany(models.CartItems, {
            foreignKey: 'cartId',
        });

    };

    return Cart;
};

export default CartModel;
