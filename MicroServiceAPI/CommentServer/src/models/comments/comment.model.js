export default (sequelize, DataTypes) => {
  const CommentSchema = sequelize.define('comments', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  return CommentSchema;
};
