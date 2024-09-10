import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { markGoalAsCompleted } from '../../services/mark-goal-as-completed';

export const completionGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body;

      await markGoalAsCompleted({ goalId });
    }
  );
};
