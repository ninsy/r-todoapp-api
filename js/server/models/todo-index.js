import Sequelize from 'sequelize';
import Models from './db';

const TodoIndexModel = function(sequelize) {
  const TodoIndex = sequelize.define('TodoIndex', {
    parentId: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    childId: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
  }, {
    hooks: {},
    classMethods: {
      associate: function(Models) {
        TodoIndex.belongsTo(Models.Todo, {
          as: 'parent',
          foreignKey: 'parentId'
        });
        TodoIndex.belongsTo(Models.Todo, {
          as: 'child',
          foreignKey: 'childId'
        })
      }
    }
  });
  return TodoIndex;
}

export default TodoIndexModel;

