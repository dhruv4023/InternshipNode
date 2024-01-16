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
            references: {
                model: 'Users', // The name of the referenced model (it should be the same as the model name in define())
                key: 'id', // The name of the referenced column in the referenced model
            },
            onUpdate: 'CASCADE', // Optional: Cascade update if the referenced user ID is updated
            onDelete: 'CASCADE', // Optional: Cascade delete if the referenced user is deleted
        },
    });

    Products.associate = (models) => {
        // Set up the association between Product and User models
        Products.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE', // Optional: Cascade deletion if a user is deleted
        });
        Products.hasMany(models.Cart, {
            foreignKey: 'productId',
        });
        Products.hasMany(models.PurchasedItems, {
            foreignKey: 'productId',
        });
    };

    return Products;
};

export default ProductModel;
