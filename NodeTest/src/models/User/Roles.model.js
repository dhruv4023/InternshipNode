export default (sequelize, DataTypes) => {
  const RoleSchema = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
  });

  return RoleSchema;
};
