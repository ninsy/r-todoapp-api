let Sequelize = require('sequelize');
let fs = require('fs');
let path = require('path');
let config = require('../config/config');

let sequelize = new Sequelize(
  config.sequelizeOptions.name,
  config.sequelizeOptions.user,
  config.sequelizeOptions.pass,
  {
    dialect: config.sequelizeOptions.dialect,
    host: config.sequelizeOptions.host,
    pool: config.sequelizeOptions.pool,
    logging: config.sequelizeOptions.logging
  }
);

let db = {};
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'db.js';
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize
//   .query("SET FOREIGN_KEY_CHECKS = 0")
//   .then(function() {
//     return db.sequelize.sync({ force: true });
//   })
//   .then(function() {
//     return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
//   });

setInterval(function() {
  db.sequelize.query('SELECT 1');
}, 5000);

module.exports = db;
