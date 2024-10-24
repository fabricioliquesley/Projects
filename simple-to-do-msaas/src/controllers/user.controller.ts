import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const listUserController = async (
	_request: Request,
	response: Response
) => {
	const users = await prisma.user.findMany();

	response.send(users);
};

export const findOneUserController = async (
	request: Request,
	response: Response
) => {
	const { userId } = request.params;

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		response.status(404).send({
			error: 'Bad request',
			message: 'user not found',
		});
	}

	response.send(user);
};

export const createUserController = async (
	request: Request,
	response: Response
) => {
	const { name, email, password } = request.body;

	if (!name || !email || !password) {
		response.status(404).send({
			error: 'Bad request',
			message: 'enter all the required fields',
		});
	}

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (user) {
		response.status(404).send({
			error: 'Bad request',
			message: 'user already exists',
		});
	}

	const newUser = {
		name,
		email,
		password,
	};

	await prisma.user.create({
		data: newUser,
	});

	response.send(newUser);
};
