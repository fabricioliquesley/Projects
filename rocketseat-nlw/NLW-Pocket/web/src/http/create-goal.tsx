interface CreateGoalBody {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal(body: CreateGoalBody) {
  await fetch('https://inorbit-api.onrender.com/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
