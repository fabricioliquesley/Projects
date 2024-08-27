const ExpensesRepository = require("../repositories/ExpensesRepository");
const ExpensesService = require("../service/ExpensesService");

class ExpensesController {
    async index(request, response) {
        const user_id = request.user.id;
        const { title } = request.query;

        const expensesRepository = new ExpensesRepository();
        const expensesService = new ExpensesService(expensesRepository);

        const expenses = await expensesService.execute({ user_id, title });

        response.status(201).json(expenses);
    }

    async show(request, response) {
        const user_id = request.user.id;
        const { id: transaction_id } = request.params;

        const expensesRepository = new ExpensesRepository();
        const expensesService = new ExpensesService(expensesRepository);

        const expense = await expensesService.executeShowDetail({ user_id, transaction_id });

        response.status(201).json(expense);
    }

    async delete(request, response) {
        const user_id = request.user.id;
        const { id: transaction_id } = request.params;

        const expensesRepository = new ExpensesRepository();
        const expensesService = new ExpensesService(expensesRepository);

        await expensesService.executeDelete({ user_id, transaction_id });

        response.status(201).json();
    }
}

module.exports = ExpensesController;