import {
  Bell,
  DollarSign,
  Package,
  Wrench,
  FileText,
  ShoppingCart,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';

interface Notificacao {
  id: number;
  texto: string;
  tempo: string;
  tipo: 'financeiro' | 'estoque' | 'os' | 'contrato' | 'comercial';
  icone: LucideIcon;
  cor: string;
}

const NOTIFICACOES: Notificacao[] = [
  {
    id: 1,
    texto: '3 contas vencidas',
    tempo: '5 min',
    tipo: 'financeiro',
    icone: DollarSign,
    cor: 'bg-red-500',
  },
  {
    id: 2,
    texto: 'Estoque crítico: Strata-X SPE',
    tempo: '12 min',
    tipo: 'estoque',
    icone: Package,
    cor: 'bg-amber-500',
  },
  {
    id: 3,
    texto: 'OS-2026-0350 aguardando peça há 15 dias',
    tempo: '1h',
    tipo: 'os',
    icone: Wrench,
    cor: 'bg-orange-500',
  },
  {
    id: 4,
    texto: 'Contrato Biofarma vence em 5 dias',
    tempo: '2h',
    tipo: 'contrato',
    icone: FileText,
    cor: 'bg-blue-500',
  },
  {
    id: 5,
    texto: '2 cotações expiradas',
    tempo: '3h',
    tipo: 'comercial',
    icone: ShoppingCart,
    cor: 'bg-purple-500',
  },
];

export function NotificacoesDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 text-white border-0">
            5
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NOTIFICACOES.map((notificacao) => {
          const Icon = notificacao.icone;
          return (
            <DropdownMenuItem
              key={notificacao.id}
              className="flex items-start gap-3 py-3 cursor-pointer"
            >
              <div
                className={`mt-0.5 h-2 w-2 rounded-full ${notificacao.cor} shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{notificacao.texto}</p>
                <p className="text-xs text-muted-foreground">
                  {notificacao.tempo} atrás
                </p>
              </div>
              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-violet-500 cursor-pointer">
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
