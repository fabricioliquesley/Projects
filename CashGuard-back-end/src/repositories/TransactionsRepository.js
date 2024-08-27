const knex = require("../database/knex");

class TransactionsRepository {
    async insertTransaction({ type, title, description, value, date, category, status, user_id }) {
        await knex(type).insert({
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

    async getTransactions({ user_id, title }) {
        let transactions;

        if (title) {
            transactions = await knex("incomes")
                .select([
                    "incomes.id",
                    "incomes.type",
                    "incomes.title",
                    "incomes.description",
                    "incomes.value",
                    "incomes.date",
                    "incomes.category",
                    "incomes.status",
                ])
                .where("incomes.user_id", user_id)
                .whereLike("incomes.title", `%${title}%`)
                .union(function () {
                    this.select([
                        "expenses.id",
                        "expenses.type",
                        "expenses.title",
                        "expenses.description",
                        "expenses.value",
                        "expenses.date",
                        "expenses.category",
                        "expenses.status",
                    ]).from("expenses")
                        .innerJoin("incomes", "expenses.user_id", "=", "incomes.user_id")
                        .where("incomes.user_id", user_id)
                        .whereLike("expenses.title", `%${title}%`)
                        .groupBy(["incomes.id", "expenses.id"])
                        .orderBy("value")
                });
        } else {
            transactions = await knex("incomes")
                .select([
                    "incomes.id", 
                    "incomes.type", 
                    "incomes.title",
                    "incomes.description",
                    "incomes.value",
                    "incomes.date",
                    "incomes.category",
                    "incomes.status",
                ])
                .where("incomes.user_id", user_id)
                .union(function () {
                    this.select([
                        "expenses.id",
                        "expenses.type",
                        "expenses.title",
                        "expenses.description",
                        "expenses.value",
                        "expenses.date",
                        "expenses.category",
                        "expenses.status",
                    ]).from("expenses")
                        .innerJoin("incomes", "expenses.user_id", "=", "incomes.user_id")
                        .where("incomes.user_id", user_id)
                        .groupBy(["incomes.id", "expenses.id"])
                        .orderBy("value")
                });
        }

        return transactions;
    }

    async updateTransaction({ transaction_id, type, title, description, value, date, category, status }) {
        await knex(type).update({
            type,
            title,
            description,
            value,
            date,
            category,
            status
        }).where("id", transaction_id);
    }
}

module.exports = TransactionsRepository;