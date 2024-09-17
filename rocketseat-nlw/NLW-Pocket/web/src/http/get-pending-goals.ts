type getPendingGoalsResponse = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export async function getPendingGoals(): Promise<getPendingGoalsResponse> {
  const response = await fetch(
    'https://inorbit-api.onrender.com/pending-goals'
  );

  const data = await response.json();

  return data.pendingGols;
}
