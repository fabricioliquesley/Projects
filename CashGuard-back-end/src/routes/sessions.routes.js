const { Router } = require("express");
const SessionsController = require("../controllers/SessionsController")

const sessionsRoute = Router();

const sessionsController = new SessionsController();

sessionsRoute.post("/", sessionsController.create);

module.exports = sessionsRoute;