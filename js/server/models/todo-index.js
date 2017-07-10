let Sequelize = require("sequelize");
let Models = require("./db");

const TodoIndexModel = function(sequelize) {
  const TodoIndex = sequelize.define(
    "TodoIndex",
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
            foreignKey: "parentId"
          });
          TodoIndex.belongsTo(Models.Todo, {
            foreignKey: "childId"
          });
        }
      }
    }
  );
  return TodoIndex;
};

module.exports = TodoIndexModel;
