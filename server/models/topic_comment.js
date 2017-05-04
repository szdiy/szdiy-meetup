module.exports = function(sequelize, DataTypes) {
  let Topic = sequelize.define('Topic', 
    // fields
    {
      title: DataTypes.STRING,
      summary: DataTypes.STRING,
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
