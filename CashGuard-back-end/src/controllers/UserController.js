const UserRepository = require("../repositories/UserRepository");
const UserService = require("../service/UserService")

class UserController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.executeCreateUser({name, email, password});

        response.status(201).json();
    }

    async update(request, response) {
        const { name, email, old_password, password } = request.body;
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        const user = await userService.executeUpdateUser({ user_id, name, email, old_password, password })

        response.status(201).json(user);
    }
}

module.exports = UserController;