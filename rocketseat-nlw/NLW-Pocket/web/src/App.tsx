import { Dialog } from './components/ui/dialog';
import { CreateGoal } from './components/create-goal';
import { EmptyGoals } from './components/empty-goals';
import { Summary } from './components/summary';
import { useQuery } from '@tanstack/react-query';
import { getSummary } from './http/get-summary';

export function App() {
  const SIXTY_SECONDS = 60 * 1000;

  const { data } = useQuery({
    queryFn: getSummary,
    queryKey: ['get-summary'],
    staleTime: SIXTY_SECONDS,
  });

  return (
    <Dialog>
      {data ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  );
}
