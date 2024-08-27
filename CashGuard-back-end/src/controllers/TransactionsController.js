const TransactionsRepository = require("../repositories/TransactionsRepository");
const TransactionsService = require("../service/TransactionsService");

class TransactionsController {
    async create(request, response) {
        const { type, title, description, value, date, category, status } = request.body;
        const user_id = request.user.id;

        const transactionsRepository = new TransactionsRepository();
        const transactionsService = new TransactionsService(transactionsRepository);

        const user = await transactionsService.execute({ 
            type, 
            title, 
            description, 
            value, 
            date,
            category, 
            status, 
            user_id 
        })

        response.status(201).json(user);
    }

    async index(request, response) {
        const { title } = request.query;
        const user_id = request.user.id;

        const transactionsRepository = new TransactionsRepository();
        const transactionsService = new TransactionsService(transactionsRepository);

        const transactions = await transactionsService.executeGetTransactions({ user_id, title });

        response.status(200).json(transactions);
    }

    async show(request, response) {
        const user_id = request.user.id;

        const transactionsRepository = new TransactionsRepository();
        const transactionsService = new TransactionsService(transactionsRepository);

        const recentTransactions = await transactionsService.executeGetRecentTransactions({user_id});

        response.status(200).json(recentTransactions);
    }

    async update(request, response) {
        const { transaction_id, type, title, description, value, date, category, status, } = request.body;

        const transactionsRepository = new TransactionsRepository();
        const transactionsService = new TransactionsService(transactionsRepository);

        await transactionsService.executeUpdateTransaction({
            transaction_id, 
            type, 
            title, 
            description, 
            value,
            date,
            category, 
            status
        })

        response.status(201).json();
    }
}

module.exports = TransactionsController;