export default (sequelize, DataTypes) => {
  const PostSchema = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING, // Assuming the image path or URL is a string
      allowNull: true, // Adjust as needed
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return PostSchema;
};
