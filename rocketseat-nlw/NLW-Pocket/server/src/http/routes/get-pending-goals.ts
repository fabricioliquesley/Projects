import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoals } from '../../services/get-week-pending-goals';

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async (_, response) => {
    const { pendingGols } = await getWeekPendingGoals();

    return response.status(200).send({ pendingGols });
  });
};
