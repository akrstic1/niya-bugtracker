const express = require("express");

const assignController = require("../controllers/assignController");

const router = express.Router();

//Assign
router.post("/:user_id/ticket/:ticket_id/", assignController.assignToUser);

module.exports = router;
