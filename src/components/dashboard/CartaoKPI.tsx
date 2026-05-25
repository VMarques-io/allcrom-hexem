import type { ElementType } from 'react';

interface CartaoKPIProps {
  titulo: string;
  valor: string;
  variacao: string;
  tipoVariacao: 'positivo' | 'negativo' | 'neutro';
  icone: ElementType;
}

const corVariacao: Record<CartaoKPIProps['tipoVariacao'], string> = {
  positivo: 'text-green-600',
  negativo: 'text-red-600',
  neutro: 'text-muted-foreground',
};

export function CartaoKPI({ titulo, valor, variacao, tipoVariacao, icone: Icone }: CartaoKPIProps) {
  return (
    <div className="bg-card rounded-xl p-3 sm:p-4 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="bg-primary/10 text-primary rounded-lg p-1.5 sm:p-2">
          <Icone className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
        </div>
      </div>
      <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{titulo}</p>
      <p className="text-base sm:text-xl font-bold mt-1 truncate">{valor}</p>
      <p className={`text-[10px] sm:text-xs mt-0.5 ${corVariacao[tipoVariacao]}`}>{variacao}</p>
    </div>
  );
}
