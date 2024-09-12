interface CreateGoalBody {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal(body: CreateGoalBody) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
