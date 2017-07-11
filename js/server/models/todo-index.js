let Sequelize = require('sequelize');
let Models = require('./db');

const TodoIndexModel = function(sequelize) {
  const TodoIndex = sequelize.define(
    'TodoIndex',
    {
      parentId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      childId: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    },
    {
      hooks: {},
      classMethods: {
        associate: function(Models) {
          TodoIndex.belongsTo(Models.Todo, {
            foreignKey: 'parentId',
            onDelete: 'cascade'
          });
          TodoIndex.belongsTo(Models.Todo, {
            foreignKey: 'childId',
            onDelete: 'cascade'
          });
        }
      }
    }
  );
  return TodoIndex;
};

module.exports = TodoIndexModel;
