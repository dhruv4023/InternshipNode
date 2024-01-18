export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
  });

  return Roles;
};
