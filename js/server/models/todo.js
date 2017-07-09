import Sequelize from 'sequelize';
import Models from './db';

const TodoModel = function(sequelize) {
  const Todo = sequelize.define('Todo', {
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
      default: false
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  }, {
    classMethods: {
      associate: function(Models) {
        Todo.hasMany(Models.TodoIndex, {
          as: 'parent',
          foreignKey: 'parentId'
        });
        Todo.hasMany(Models.TodoIndex, {
          as: 'child',
          foreignKey: 'childId',
          onDelete: 'cascade'
        });
      }
    }
  });
  return Todo;
}

export default TodoModel;

