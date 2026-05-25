import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIORIDADES } from '@/lib/constants';

interface AgendamentoOS {
  id: string;
  numeroOS: string;
  cliente: string;
  equipamento: string;
  tecnico: string;
  diaSemana: number;
  horaInicio: number;
  duracao: number;
  prioridade: string;
  tipo: string;
}

const MOCK_AGENDAMENTOS: AgendamentoOS[] = [
  { id: '1', numeroOS: 'OS-0045', cliente: 'Laboratório ABC', equipamento: 'HPLC Agilent 1260', tecnico: 'Carlos Lima', diaSemana: 1, horaInicio: 9, duracao: 3, prioridade: 'critica', tipo: 'Manutenção Corretiva' },
  { id: '2', numeroOS: 'OS-0046', cliente: 'Farmacêutica XYZ', equipamento: 'GC Shimadzu 2030', tecnico: 'Pedro Santos', diaSemana: 2, horaInicio: 8, duracao: 4, prioridade: 'alta', tipo: 'Calibração' },
  { id: '3', numeroOS: 'OS-0047', cliente: 'Hospital São Paulo', equipamento: 'Dissolutor Raytor RT-600', tecnico: 'Ana Costa', diaSemana: 3, horaInicio: 10, duracao: 2, prioridade: 'media', tipo: 'Instalação' },
  { id: '4', numeroOS: 'OS-0051', cliente: 'Laboratório ABC', equipamento: 'HPLC Detector DAD', tecnico: 'Carlos Lima', diaSemana: 4, horaInicio: 8, duracao: 5, prioridade: 'critica', tipo: 'Suporte Técnico' },
  { id: '5', numeroOS: 'OS-0053', cliente: 'Universidade Federal', equipamento: 'HPLC Waters e2695', tecnico: 'Pedro Santos', diaSemana: 4, horaInicio: 14, duracao: 3, prioridade: 'baixa', tipo: 'Preventiva' },
  { id: '6', numeroOS: 'OS-0054', cliente: 'Petroquímica ABC', equipamento: 'GC Agilent 7890B', tecnico: 'Ana Costa', diaSemana: 5, horaInicio: 9, duracao: 4, prioridade: 'alta', tipo: 'Qualificação' },
];

const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const HORAS = Array.from({ length: 11 }, (_, i) => i + 8);

const PRIORIDADE_CORES: Record<string, string> = {
  critica: 'bg-red-500 text-white border-red-600',
  alta: 'bg-orange-400 text-white border-orange-500',
  media: 'bg-blue-400 text-white border-blue-500',
  baixa: 'bg-gray-400 text-white border-gray-500',
};

const TECNICO_CORES: Record<string, string> = {
  'Carlos Lima': 'border-l-red-500',
  'Pedro Santos': 'border-l-blue-500',
  'Ana Costa': 'border-l-green-500',
};

export default function Agendamento() {
  const [semanaOffset, setSemanaOffset] = useState(0);

  const getAgendamentosForCell = (dia: number, hora: number) => {
    return MOCK_AGENDAMENTOS.filter(
      (a) => a.diaSemana === dia && hora >= a.horaInicio && hora < a.horaInicio + a.duracao
    );
  };

  const isStart = (a: AgendamentoOS, hora: number) => hora === a.horaInicio;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agendamento</h1>
          <p className="text-muted-foreground">Calendário de atendimentos técnicos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setSemanaOffset((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-3">
            Semana {semanaOffset === 0 ? 'Atual' : semanaOffset > 0 ? `+${semanaOffset}` : semanaOffset}
          </span>
          <Button variant="outline" size="icon" onClick={() => setSemanaOffset((p) => p + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSemanaOffset(0)}>
            Hoje
          </Button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {Object.entries(TECNICO_CORES).map(([nome, cor]) => (
          <div key={nome} className="flex items-center gap-2 text-sm">
            <div className={`h-3 w-3 rounded border-l-4 ${cor}`} />
            {nome}
          </div>
        ))}
      </div>

      <Card>
        <div className="overflow-auto">
          <div className="grid grid-cols-8 min-w-[800px]">
            <div className="border-b border-r p-2 text-center text-xs font-medium text-muted-foreground">
              Hora
            </div>
            {DIAS_SEMANA.map((dia, idx) => (
              <div key={dia} className="border-b border-r p-2 text-center text-xs font-medium text-muted-foreground last:border-r-0">
                {dia}
              </div>
            ))}

            {HORAS.map((hora) => (
              <div key={hora} className="contents">
                <div className="border-b border-r p-2 text-center text-xs text-muted-foreground">
                  {hora}:00
                </div>
                {[1, 2, 3, 4, 5, 6, 7].map((dia) => {
                  const agendamentos = getAgendamentosForCell(dia, hora);
                  return (
                    <div
                      key={`${hora}-${dia}`}
                      className="border-b border-r p-0.5 min-h-[48px] last:border-r-0"
                    >
                      {agendamentos.map((a) =>
                        isStart(a, hora) ? (
                          <div
                            key={a.id}
                            className={`rounded px-1.5 py-1 text-xs border-l-4 ${TECNICO_CORES[a.tecnico] ?? 'border-l-gray-400'} ${PRIORIDADE_CORES[a.prioridade] ?? 'bg-gray-200'}`}
                            style={{ minHeight: `${a.duracao * 48 - 4}px` }}
                            title={`${a.numeroOS} - ${a.cliente}`}
                          >
                            <p className="font-semibold truncate">{a.numeroOS}</p>
                            <p className="truncate opacity-90">{a.cliente}</p>
                            <p className="truncate opacity-75">{a.tipo}</p>
                          </div>
                        ) : null
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
