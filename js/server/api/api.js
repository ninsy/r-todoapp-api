let router = require('express').Router({ mergeParams: true });
let todoRouter = require('./todo/router.js');

router.use('/todos', todoRouter);

module.exports = router;
