let router = require("express").Router({ mergeParams: true });
let ctrl = require("./controller");

router.param("id", ctrl.params);

router.route("/").get(ctrl.getAll).post(ctrl.create);

router.route("/:id").get(ctrl.getOne).put(ctrl.edit).delete(ctrl.erase);

module.exports = router;
