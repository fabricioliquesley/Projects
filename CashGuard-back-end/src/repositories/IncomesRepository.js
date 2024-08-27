const knex = require("../database/knex");

class IncomesRepository {
    async getIncomes({ user_id, transaction_id = false, title }) {
        if (transaction_id){
            const [incomes] = await knex("incomes").where("id", transaction_id);

            return incomes;
        } else if (title){
            const incomes = await knex("incomes")
                .where("user_id", user_id)
                .whereLike("incomes.title", `%${title}%`);

            return incomes;
        }

        const incomes = await knex("incomes").where("user_id", user_id);

        return incomes;
    }

    async deleteIncome({ transaction_id }) {
        return await knex("incomes").where("id", transaction_id).delete();
    }
}

module.exports = IncomesRepository;