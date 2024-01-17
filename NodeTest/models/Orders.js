// OrderModel.js

const OrderModel = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Orders;
};

export default OrderModel;
