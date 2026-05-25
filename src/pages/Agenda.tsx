import { CalendarDays } from 'lucide-react';

export default function Agenda() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agenda Geral</h1>
        <p className="text-muted-foreground">Gestão de compromissos e prazos</p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <CalendarDays className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-muted-foreground">Em breve</h2>
        <p className="text-sm text-muted-foreground mt-1">Módulo em desenvolvimento</p>
      </div>
    </div>
  );
}
