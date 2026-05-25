import { CalendarDays, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatarMoeda } from '@/lib/formatters';

interface Evento {
  id: string;
  nome: string;
  data: string;
  local: string;
  stand: string;
  status: 'planejado' | 'confirmado' | 'realizado';
  orcamento: number;
  leadsGerados: number | null;
  roi: number | null;
}

const MOCK_EVENTOS: Evento[] = [
  { id: '1', nome: 'Hospitalar 2026', data: '2026-05-12', local: 'São Paulo, SP - Expo Center Norte', stand: 'E-42', status: 'planejado', orcamento: 85000, leadsGerados: null, roi: null },
  { id: '2', nome: 'ANALÍTICA 2026', data: '2026-09-08', local: 'São Paulo, SP - Transamérica Expo Center', stand: 'B-15', status: 'planejado', orcamento: 120000, leadsGerados: null, roi: null },
  { id: '3', nome: 'SBBI 2026', data: '2026-07-20', local: 'Campinas, SP - Centro de Convenções', stand: 'C-08', status: 'confirmado', orcamento: 45000, leadsGerados: null, roi: null },
  { id: '4', nome: 'Congresso Ibero 2026', data: '2026-10-15', local: 'Lisboa, Portugal - Centro de Congressos', stand: '-', status: 'planejado', orcamento: 65000, leadsGerados: null, roi: null },
  { id: '5', nome: 'Feira Química 2026', data: '2026-04-05', local: 'Rio de Janeiro, RJ - Riocentro', stand: 'A-23', status: 'realizado', orcamento: 55000, leadsGerados: 87, roi: 2.8 },
];

const STATUS_CONFIG = {
  planejado: { label: 'Planejado', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  confirmado: { label: 'Confirmado', className: 'bg-green-100 text-green-800 border-green-200' },
  realizado: { label: 'Realizado', className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

export default function Eventos() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Eventos</h1>
        <p className="text-muted-foreground">Feiras, congressos e eventos do setor</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_EVENTOS.map((evento) => (
          <Card key={evento.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-base leading-tight">{evento.nome}</h3>
                <Badge variant="outline" className={STATUS_CONFIG[evento.status].className}>
                  {STATUS_CONFIG[evento.status].label}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span>{new Date(evento.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{evento.local}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Stand: </span>
                  <span className="font-medium">{evento.stand}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Orçamento: </span>
                  <span className="font-medium">{formatarMoeda(evento.orcamento)}</span>
                </div>
              </div>

              {evento.status === 'realizado' && evento.leadsGerados !== null && (
                <div className="pt-2 border-t flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Leads: </span>
                    <span className="font-bold text-primary">{evento.leadsGerados}</span>
                  </div>
                  {evento.roi !== null && (
                    <div>
                      <span className="text-muted-foreground">ROI: </span>
                      <span className="font-bold text-green-600">{evento.roi.toFixed(1)}x</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
