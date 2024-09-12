import { Plus } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPendingGoals } from '../http/get-pending-goals';
import { markGoalAsCompleted } from '../http/mark-goal-as-completed';

export function PendingGoals() {
  const queryClient = useQueryClient();

  const SIXTY_SECONDS = 60 * 1000;

  const { data } = useQuery({
    queryFn: getPendingGoals,
    queryKey: ['get-pending-goals'],
    staleTime: SIXTY_SECONDS,
  });

  if (!data) return null;

  async function handleCompleteGoal(goalId: string) {
    await markGoalAsCompleted(goalId);

    queryClient.invalidateQueries({
      queryKey: ['get-summary'],
    });
    queryClient.invalidateQueries({
      queryKey: ['get-pending-goals'],
    });
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {data.map(goal => {
        const frequencyOfTheWeekReached =
          goal.completionCount >= goal.desiredWeeklyFrequency;

        return (
          <OutlineButton
            key={goal.id}
            disabled={frequencyOfTheWeekReached}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
