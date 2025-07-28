import { ShieldHalf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Durban Alert Logo">
      <ShieldHalf className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold font-headline tracking-tighter">
        Durban Alert
      </span>
    </div>
  );
}
