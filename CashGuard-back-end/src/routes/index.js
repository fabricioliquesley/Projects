const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionsRoute = require("../routes/sessions.routes");
const transactionsRoutes = require("./transactions.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoute);
routes.use("/transactions", transactionsRoutes);

module.exports = routes;