import { CheckCircle2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { DialogTrigger } from './ui/dialog';
import { InOrbitIcon } from './in-orbit-icon';
import { Progress, ProgressIndicator } from './ui/progress-bar';
import { Separator } from './ui/separator';
import { useQuery } from '@tanstack/react-query';
import { getSummary } from '../http/get-summary';
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { PendingGoals } from './pending-goals';

dayjs.locale(ptBr);

export function Summary() {
  const SIXTY_SECONDS = 60 * 1000;
  const firstDayOfWeek = dayjs().startOf('week').format('D MMM');
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM');

  const { data } = useQuery({
    queryFn: getSummary,
    queryKey: ['get-summary'],
    staleTime: SIXTY_SECONDS,
  });

  if (!data) {
    return null;
  }

  const completedPercentage = Math.round((data.completed * 100) / data.total);

  return (
    <div className="py-10 max-w-[480px] px-8 md:px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastra meta
          </Button>
        </DialogTrigger>
      </div>
      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completed}</span> de{' '}
            <span className="text-zinc-100">{data.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      {data.goalsPerDay && (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>
          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd');
            const formattedDate = dayjs(date).format('D[ de ]MMMM');

            return (
              <div className="flex flex-col gap-4" key={date}>
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay} </span>
                  <span className="text-xs text-zinc-400">
                    ({formattedDate})
                  </span>
                </h3>
                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm');
                    return (
                      <li
                        className="flex items-center gap-2"
                        key={goal.completedAt}
                      >
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou "
                          <span className="text-zinc-100">{goal.title}</span>"
                          ás <span className="text-zinc-100">{time}h</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
