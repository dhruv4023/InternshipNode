export default (sequelize, DataTypes) => {
  const PostSchema = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255], // Adjust the length validation as needed
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Users',
      //   key: 'id',
      // },
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    },
  }, {
    timestamps: true,
  });

  return PostSchema;
};
