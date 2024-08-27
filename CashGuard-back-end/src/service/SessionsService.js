const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");
const { response } = require("express");

class SessionsService {
    constructor(repository) {
        this.sessionsRepository = repository;
    }

    async execute({ email, password }) {
        const user = await this.sessionsRepository.getUser({ email })

        if (!user) throw new AppError("E-mail e/ou senha incorreta.", 401);

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) throw new AppError("E-mail e/ou senha incorreta.", 401);

        const { expiresIn, secret } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        delete user.password;

        return {user, token};
    }
}

module.exports = SessionsService;