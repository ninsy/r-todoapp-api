let service = require("./service");

const ctrl = {
  params(req, res, next, id) {
    id = parseInt(id);
    service.getOne(id).then(([children, currRoot]) => {
      if (!currRoot) {
        return next({
          status: 404,
          message: `Todo with id [${id}] doesn't exist.`
        });
      }
      // TODO: construct that modernizr flat stuff
      req.todo = currRoot;
      next();
    });
  },
  getOne(req, res, next) {
    res.status(200).json({ todo: req.todo });
  },
  getAll(req, res, next) {
    return res.status(200).json({ message: "WSZYSTKO GIT HEHE" });
  },
  create(req, res, next) {
    return service
      .create(req.body)
      .then(todo => {
        return res.status(201).json({ todo });
      })
      .catch(next);
  },
  edit(req, res, next) {},
  erase(req, res, next) {}
};

module.exports = ctrl;
