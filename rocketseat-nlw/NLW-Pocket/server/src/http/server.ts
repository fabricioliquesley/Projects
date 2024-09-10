import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createGoal } from './services/create-goal';
import { z } from 'zod';
import { getWeekPendingGoals } from './services/get-week-pending-goals';
import { markGoalAsCompleted } from './services/mark-goal-as-completed';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number(),
      }),
    },
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body;

    await createGoal({
      title,
      desiredWeeklyFrequency,
    });
  }
);

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

app.get('/pending-goals', async (_, response) => {
  const { pendingGols } = await getWeekPendingGoals();

  return response.status(200).send({ pendingGols });
});

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server listening on port 3333');
});
