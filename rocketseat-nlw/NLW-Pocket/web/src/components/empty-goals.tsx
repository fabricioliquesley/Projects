import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { DialogTrigger } from './ui/dialog';

import logo from '../assets/logo.svg';
import letsStart from '../assets/lets-start-illustration.svg';

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 p-4 ">
      <img src={logo} alt="In.orbit" />
      <img
        src={letsStart}
        alt="Woman pressing a button to launch a rocket."
        className="w-64 md:w-80"
      />
      <p className="text-zinc-300 leading-relaxed max-w-[260px] md:max-w-80 text-center text-sm md:text-base">
        Você ainda não cadastrou nenhuma meta, que tal{' '}
        <b className="underline font-normal">cadastrar uma</b> agora mesmo?
      </p>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastra meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
