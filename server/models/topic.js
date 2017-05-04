module.exports = function(sequelize, DataTypes) {
  let Topic = sequelize.define('Topic', 
    // fields
    {
      title: DataTypes.STRING,
      summary: DataTypes.STRING,
      star_count: DataTypes.INTEGER,
      comment_count: DataTypes.INTEGER,
    },

    // options
    {
      classMethods: {
        associate: function(models) {
          // ...add relationship
        },
      }
    }
  );

  return Topic;
}
