import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../components/ui/radio-group';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGoal } from '../http/create-goal';
import { useQueryClient } from '@tanstack/react-query';

const createGoalForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalForm>;

export function CreateGoal() {
  const radioGroupItems = ['🥱', '🙂', '😎', '😜', '🤨', '🤯'];

  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    });

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal(data);

    queryClient.invalidateQueries({
      queryKey: ['get-summary'],
    });
    queryClient.invalidateQueries({
      queryKey: ['get-pending-goals'],
    });

    reset();
  }

  return (
    <DialogContent className="w-[200px]">
      <div className="flex flex-col gap-6 h-full ">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que{' '}
            <b className="underline font-normal">te fazem bem</b> e que você
            quer continuar praticando toda semana.
          </DialogDescription>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-1 flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                {...register('title')}
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
              />
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      {radioGroupItems.map((emoji, i) => {
                        const frequency = String(i + 1);

                        return (
                          <RadioGroupItem value={frequency} key={emoji}>
                            <RadioGroupIndicator />
                            <span className="text-zinc-300 text-sm font-medium leading-none">
                              {frequency}x na semana
                            </span>
                            <span className="text-lg leading-none">
                              {emoji}
                            </span>
                          </RadioGroupItem>
                        );
                      })}
                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos os dias da semana
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
