let sequelize = require("sequelize");
const difference = require('lodash.difference');
let Models = require("../../models/db");

function addIndexes(parentId, ...childrenIds) {
  let promiseArr =
      childrenIds.map(cId => {
        return Models.TodoIndex.create({
          parentId,
          childId: cId
        })
      });
  return Promise.all(promiseArr);
}

const service = {
  create(todo) {
    if (todo.parentId) {
      return Models.Todo.findById(todo.parentId).then(parent => {
        return Models.Todo.create(todo).then(fresh => {
          return addIndexes(parent.id, fresh.id)
            .then(_ => {
              return fresh;
            });
        });
      });
    } else {
      return Models.Todo.create(todo);
    }
  },
  getOne(todoId) {
    const promiseArr = [
      Models.TodoIndex.findAll({
        include: [
          {
            model: Models.Todo,
            order: [["finished", "DESC"]]
          }
        ]
      }),
      Models.Todo.findById(todoId)
    ];
    return Promise.all(promiseArr);
  },
  getAll() {
    return Models.TodoIndex.findAll({
      include: [
        {
          model: Models.Todo,
          required: true
        }
      ]
    });
  },
  update({currentTodo, updateTodo}) {
    const finalTodo = Object.assign(currentTodo, updateTodo);
    return finalTodo.save();
  },
  erase({todoToDelete, childrenToDelete}) {
    let promiseArr = [
      Models.Todo.update({deleted: true}, {
        where: {
          id: { $in: [...childrenToDelete, todoToDelete.id]}
        }
      }),
      Models.TodoIndex.destroy({
        where: {
          $or: [
            { childId: { $in: [...childrenToDelete, todoToDelete.id ]} },
          ]
        }
      })
    ];
    return Promise.all(promiseArr)
      .then(_ => {
          return {
            todo: todoToDelete,
            erasedTodo: childrenToDelete
          }
      });
  },

};

module.exports = service;
