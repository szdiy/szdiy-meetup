import {generateHashPassword, validPassword} from "../utils/encrypt";

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User",
    // fields
    {
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      real_name: {type:DataTypes.STRING, allowNull:true},
      password: DataTypes.STRING,
      is_locked: {type:DataTypes.BOOLEAN, defautValue:false},
      is_deleted: {type:DataTypes.BOOLEAN, defaultValue:false},
      is_super: {type:DataTypes.BOOLEAN, defaultValue:false},
    },
    // options
    {
      classMethods: {
        associate: function(models) {
          // ...add relationship
        },
        generateHash: function(password) {
          return generateHashPassword(password);
        }
      },
      instanceMethods: {
        validPassword: function(password) {
          return validPassword(password, this.password);
        }
      }
    }
  );

  return User;
}
