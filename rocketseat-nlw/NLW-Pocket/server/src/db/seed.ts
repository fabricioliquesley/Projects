import dayjs from 'dayjs';
import { db, client } from '.';
import { goalCompletions, goals } from './schema';

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acorda as 06:00', desiredWeeklyFrequency: 5 },
      { title: 'Praticar saxofone', desiredWeeklyFrequency: 3 },
      { title: 'Ler', desiredWeeklyFrequency: 7 },
    ])
    .returning();

  const startOfWeek = dayjs().startOf('week');

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.toDate() },
    { goalId: result[2].id, createdAt: startOfWeek.toDate() },
  ]);
}

seed().finally(() => {
  client.end();
});
