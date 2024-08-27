const SessionsRepository = require("../repositories/SessionsRepository");
const SessionsService = require("../service/SessionsService");

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body;

        const sessionsRepository = new SessionsRepository();
        const sessionsService = new SessionsService(sessionsRepository);

        const { user, token } = await sessionsService.execute({ email, password });

        // response.cookie("token", token, {
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        //     maxAge: 15 * 60 * 1000
        // });

        response.status(201).json({user, token});
    }
}

module.exports = SessionsController;