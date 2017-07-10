import { router } from "express";
import ctrl from "./controller";

router.param("id", ctrl.params);

router.route("/").get(ctrl.getAll).post(ctrl.create);

router.route("/:id").get(ctrl.getOne).put(ctrl.edit).delete(ctrl.erase);

export default router;
