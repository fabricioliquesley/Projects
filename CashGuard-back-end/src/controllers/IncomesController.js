const IncomesRepository = require("../repositories/IncomesRepository");
const IncomesService = require("../service/IncomesService");

class IncomesController {
    async index(request, response) {
        const user_id = request.user.id;
        const { title } = request.query;

        const incomesRepository = new IncomesRepository();
        const incomesService = new IncomesService(incomesRepository);

        const incomes = await incomesService.execute({ user_id, title });

        response.status(201).json(incomes);
    }

    async show(request, response) {
        const user_id = request.user.id;
        const { id: transaction_id } = request.params;

        const incomesRepository = new IncomesRepository();
        const incomesService = new IncomesService(incomesRepository);

        const income = await incomesService.executeShowDetail({ user_id, transaction_id });

        response.status(201).json(income);
    }

    async delete(request, response) {
        const user_id = request.user.id;
        const { id: transaction_id } = request.params;

        const incomesRepository = new IncomesRepository();
        const incomesService = new IncomesService(incomesRepository);

        await incomesService.executeDelete({ user_id, transaction_id });

        response.status(201).json();
    }
}

module.exports = IncomesController;