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
              return todo;
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
  update({currentTodo, updateTodo, currentChildrenIds}) {
    //const toRemove = difference(currentChildrenIds, updateTodo.todos);
    //const toAdd = difference(updateTodo.todos, currentChildrenIds);
    const finalTodo = Object.assign(currentTodo, updateTodo);

    // let promiseArr = [
    //   Models.Todo.upsert(finalTodo),
    //   addIndexes(finalTodo.id, ...toAdd),
    //   removeIndexes(finalTodo.id, ...toRemove)
    // ];

    // fetch all children, make mapping

    return finalTodo.update();
  },
  erase({todoToDelete}) {
    let promiseArr = [
      todoToDelete.destroy(),
      Models.TodoIndex.destroy({
        where: {
          $or: [
            { childId: todoToDelete.id },
            { parentId: todoToDelete.id }
          ]
        }
      })
    ];
    return Promise.all(promiseArr)
      .then(values => {
          values[0].dataValues.todos = values[1].filter(x => x.childId !== todoToDelete.id).map(x => x.childId)
          return {
            todo: values[0]
          }
      });
  },

};

module.exports = service;
