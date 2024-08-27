const AppError = require("../utils/AppError");

class TransactionsService {
    constructor(repository) {
        this.transactionsRepository = repository;
    }

    async execute({ type, title, description, value, date, category, status, user_id }) {
        await this.transactionsRepository.insertTransaction({
            type,
            title,
            description,
            value,
            date,
            category,
            status,
            user_id
        });
    }

    async executeGetTransactions({ user_id, title }) {
        return await this.transactionsRepository.getTransactions({ user_id, title });
    }

    async executeGetRecentTransactions({ user_id }) {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const [todayDate,] = today.toISOString().split("T");
        const [sevenDaysAgoDate] = sevenDaysAgo.toISOString().split("T");

        const transactions = await this.transactionsRepository.getTransactions({ user_id });

        function checkIfDateIsBetween(data, start, end) {
            return data <= end && data >= start
        }

        let recentTransactions = transactions.filter((transaction) => checkIfDateIsBetween(transaction.date, sevenDaysAgoDate, todayDate))

        return recentTransactions;
    }

    async executeUpdateTransaction({ transaction_id, type, title, description, value, date, category, status }) {
        return await this.transactionsRepository.updateTransaction({
            transaction_id,
            type,
            title,
            description,
            value,
            date,
            category,
            status,
        });
    }
}

module.exports = TransactionsService;