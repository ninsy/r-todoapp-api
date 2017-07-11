const service = require('./service');

function constructResponse(root, children) {
  const response = {
    root,
    todo: {}
  };
  response.root = root;
  let rootChildren = children.filter(ch => ch.parentId === root.id && !ch.Todo.deleted);
  response.root.dataValues.todos = rootChildren.map(ch => ch.Todo.id);
  for (let i = 0; i < rootChildren.length; i++) {
    normalizeTodoSchema(rootChildren[i].Todo, children, response);
  }
  return response;
}

function normalizeTodoSchema(currTodo, allChildren, responseObject) {
  responseObject.todo[currTodo.id] = currTodo;
  let currTodoChildren = allChildren.filter(ch => ch.parentId === currTodo.id && !ch.Todo.deleted);
  responseObject.todo[currTodo.id].dataValues.todos = currTodoChildren.map(ch => ch.Todo.id);
  if (responseObject.todo[currTodo.id].dataValues.todos.length) {
    for (let i = 0; i < currTodoChildren.length; i++) {
      normalizeTodoSchema(currTodoChildren[i].Todo, allChildren, responseObject);
    }
  }
}

const ctrl = {
  params(req, res, next, id) {
    id = parseInt(id);
    service.getOne(id).then(([children, currRoot]) => {
      if (!currRoot || currRoot.deleted) {
        return next({
          status: 404,
          message: `Todo with id [${id}] doesn't exist.`
        });
      }
      req.todo = currRoot;
      req.children = children;
      next();
    });
  },
  getOne(req, res, next) {
    let response = constructResponse(req.todo, req.children);
    res.status(200).json(response);
  },
  create(req, res, next) {
    return service
      .create(req.body)
      .then(todo => {
        return res.status(201).json(todo);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const updateTodo = req.body;
    const currentTodo = req.todo;
    const currentChildrenIds = req.children.map(ch => ch.Todo.id);

    return service
      .update({ currentTodo, updateTodo, currentChildrenIds })
      .then(todo => {
        return res.status(200).json(todo);
      })
      .catch(next);
  },
  erase(req, res, next) {
    const todoToDelete = req.todo;
    const childrenToDelete = req.children.map(ch => ch.Todo.id);
    return service
      .erase({ todoToDelete, childrenToDelete })
      .then(todo => {
        return res.status(200).json(todo);
      })
      .catch(next);
  }
};

module.exports = ctrl;
