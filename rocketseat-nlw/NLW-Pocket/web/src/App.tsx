import { Dialog } from './components/ui/dialog';
import { CreateGoal } from './components/create-goal';
import { EmptyGoals } from './components/empty-goals';
import { Summary } from './components/summary';
import { useQuery } from '@tanstack/react-query';
import { getSummary } from './http/get-summary';
import { Loading } from './components/loading';

export function App() {
  const SIXTY_SECONDS = 60 * 1000;

  const { data, isLoading } = useQuery({
    queryFn: getSummary,
    queryKey: ['get-summary'],
    staleTime: SIXTY_SECONDS,
  });

  if (isLoading) return <Loading />;

  return (
    <Dialog>
      {data?.total && !isLoading ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  );
}
