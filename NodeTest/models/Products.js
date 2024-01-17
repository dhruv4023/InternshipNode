const ProductModel = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Products;
};

export default ProductModel;
