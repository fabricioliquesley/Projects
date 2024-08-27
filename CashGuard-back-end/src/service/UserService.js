const AppError = require("../utils/AppError");
const { compare, hash } = require("bcryptjs");

class UserService {
    constructor(repository) {
        this.userRepository = repository;
    }

    async executeCreateUser({ name, email, password }) {
        if (name == "" || email == "" || password == "") {
            throw new AppError("Preencha todos os campos para cadastrar");
        }

        const userExists = await this.userRepository.checkEmail({ email });

        if (userExists) {
            throw new AppError("Email já em uso!");
        }

        const hashedPassword = await hash(password, 8)

        return await this.userRepository.createUser({ name, email, password: hashedPassword });
    }

    async executeUpdateUser({ user_id, name, email, old_password, password }) {
        const user = await this.userRepository.getUser({ user_id });

        if (!user) throw new AppError("Usuário não encontrado");

        if (email) {
            const checkEmailIsAvailable = await this.userRepository.checkEmail({ email });

            if (checkEmailIsAvailable && checkEmailIsAvailable.id !== user.id) throw new AppError("Email já em uso!");
        }

        if ((password && !old_password) || (old_password && !password)) throw new AppError("É preciso informar a senha antiga e a nova para fazer a atualização!");

        if (password) {
            const checkPasswordMatch = await compare(old_password, user.password);

            if (!checkPasswordMatch) throw new AppError("A senha atual não corresponde com a informada!");

            user.password = await hash(password, 8);
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await this.userRepository.updateUser({
            user_id,
            name: user.name,
            email: user.email,
            password: user.password
        });

        return user;
    }
}

module.exports = UserService;