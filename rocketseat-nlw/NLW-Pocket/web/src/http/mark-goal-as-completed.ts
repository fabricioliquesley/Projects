export async function markGoalAsCompleted(goalId: string) {
  await fetch('https://inorbit-api.onrender.com/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  });
}
