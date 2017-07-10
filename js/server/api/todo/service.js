import sequelize from "sequelize";
import Models from "../../models/db";

const service = {
  create(todo) {
    if (todo.parentId) {
      return Models.Todo.findById(todo.parentId).then(parent => {
        return Models.Todo.create(todo).then(fresh => {
          return Models.TodoIndex
            .create({
              parentId: parent.id,
              childId: fresh.id
            })
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
        where: {
          parentId: todoId
        },
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
  }
};

export default service;
