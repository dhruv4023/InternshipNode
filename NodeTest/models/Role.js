const RoleModel = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
  });

  // Roles.associate = (models) => {
  //   Roles.hasMany(models.Users, {
  //     foreignKey: 'roleId', // Assuming 'roleId' is the foreign key in the 'Users' table that references 'Roles.id'
  //   });
  // };

  Roles.getRoleNameById = async (roleId) => {
    try {
      const role = await Roles.findByPk(roleId);
      return role ? role.name : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving role name by ID');
    }
  };

  return Roles;
};

export default RoleModel;
