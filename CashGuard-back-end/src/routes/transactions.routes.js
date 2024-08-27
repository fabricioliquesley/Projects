const { Router, response } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const TransactionsController = require("../controllers/TransactionsController");
const ExpensesController = require("../controllers/ExpensesController");
const IncomesController = require("../controllers/IncomesController");

const transactionsController = new TransactionsController();
const expensesController = new ExpensesController();
const incomesController = new IncomesController();

const transactionsRoutes = Router();

transactionsRoutes.post('/', ensureAuthenticated, transactionsController.create);
transactionsRoutes.get('/', ensureAuthenticated, transactionsController.index);
transactionsRoutes.get('/recent', ensureAuthenticated, transactionsController.show);
transactionsRoutes.put('/', ensureAuthenticated, transactionsController.update);

transactionsRoutes.get('/incomes', ensureAuthenticated, incomesController.index);
transactionsRoutes.get('/incomes/:id', ensureAuthenticated, incomesController.show);
transactionsRoutes.delete('/incomes/:id', ensureAuthenticated, incomesController.delete);

transactionsRoutes.get('/expenses', ensureAuthenticated, expensesController.index);
transactionsRoutes.get('/expenses/:id', ensureAuthenticated, expensesController.show);
transactionsRoutes.delete('/expenses/:id', ensureAuthenticated, expensesController.delete);

module.exports = transactionsRoutes;