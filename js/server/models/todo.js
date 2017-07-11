let Sequelize = require('sequelize');
let Models = require('./db');

const TodoModel = function(sequelize) {
  const Todo = sequelize.define(
    'Todo',
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 255]
        }
      },
      finished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    {
      classMethods: {
        associate: function(Models) {
          Todo.hasMany(Models.TodoIndex, {
            foreignKey: 'parentId'
          });
          Todo.hasMany(Models.TodoIndex, {
            foreignKey: 'childId'
          });
        }
      }
    }
  );
  return Todo;
};

module.exports = TodoModel;
