const knex = require("../database/knex");

class UserRepository {
    async getUser({ user_id }) {
        const user = await knex("users").where("id", user_id).first();

        return user;
    }

    async createUser({name, email, password}){
        await knex("users").insert({
            name,
            email,
            password
        })
    }

    async checkEmail({ email }) {
        const user = await knex("users").where("email", email).first();

        return user;
    }

    async updateUser ({user_id, name, email, password}) {
        await knex("users").update({
            name,
            email,
            password,
            updated_at: knex.fn.now()
        }).where("id", user_id);
    }
}

module.exports = UserRepository;