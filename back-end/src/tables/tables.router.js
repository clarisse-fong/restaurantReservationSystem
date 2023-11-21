/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").get(controller.list).post(controller.create);
router.route("/new").post(controller.create);
router.route("/:table_id/seat").put(controller.update);

module.exports = router;