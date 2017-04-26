import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configuration from "../config/config";

var env       = process.env.NODE_ENV || "dev";
var config    = configuration[env];

if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL,config);
} else {
  var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
}


var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
