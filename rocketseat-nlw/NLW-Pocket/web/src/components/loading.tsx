import { LoaderCircle } from 'lucide-react';

export function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoaderCircle
        color="#7c3aed"
        size={36}
        className="animate-spin 1s linear"
      />
    </div>
  );
}
