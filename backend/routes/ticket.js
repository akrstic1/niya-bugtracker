const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

//Ticket
router.get("/:ticket_id", ticketController.getByIdTicket);
router.post("/:project_id", ticketController.createTicket);
router.put("/:ticket_id", ticketController.updateTicket);
router.delete("/:ticket_id", ticketController.deleteTicket);

module.exports = router;
