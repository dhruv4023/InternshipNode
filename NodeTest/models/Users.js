const UserModel = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, Infinity],
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      references: {
        model: 'Roles', // The name of the referenced model (it should be the same as the model name in define())
        key: 'id', // The name of the referenced column in the referenced model
      },
    },
  }, {
    timestamps: true,
  });
  Users.associate = (models) => {
    Users.hasMany(models.Orders, {
      foreignKey: 'userId',
    });
    Users.hasMany(models.Products, {
      foreignKey: 'userId',
    });
    Users.hasMany(models.Cart, {
      foreignKey: 'userId',
    });

    Users.belongsTo(models.Roles, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Users;
};

export default UserModel;
