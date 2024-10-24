import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const createTaskController = async (
	request: Request,
	response: Response
) => {
	const userId = request.headers['x-user-id'];

	if (!userId) {
		response.status(403).send({
			error: 'Not authorized',
		});
	}

	const user = await prisma.user.findUnique({
		where: {
			id: userId as string,
		},
	});

	if (!user) {
		response.status(403).send({
			error: 'Not authorized',
		});
	}

	const { title } = request.body;

	if (!title) {
		response.status(404).send({
			error: 'Bad request',
			message: 'enter a title to the task',
		});
	}

	const task = await prisma.task.create({
		data: {
			title,
			isDone: false,
			userId: userId as string,
		},
	});

	response.status(201).send(task);
};
