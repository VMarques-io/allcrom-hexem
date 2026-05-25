import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Wrench,
  Clock,
  Package,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { formatarData } from '@/lib/formatters';
import { STATUS_OS, PRIORIDADES, TIPOS_OS } from '@/lib/constants';

interface OrdemServico {
  id: string;
  numero: string;
  cliente: string;
  equipamento: string;
  marca: string;
  tipo: string;
  prioridade: string;
  status: string;
  tecnico: string;
  dataAbertura: string;
  prazo: string;
  descricao?: string;
  numeroSerie?: string;
  pecas?: string[];
  historico?: { data: string; evento: string }[];
}

const MOCK_ORDENS: OrdemServico[] = [
  {
    id: '1', numero: 'OS-0045', cliente: 'Laboratório ABC', equipamento: 'HPLC Agilent 1260', marca: 'Agilent',
    tipo: 'manutencao_corretiva', prioridade: 'critica', status: 'em_andamento', tecnico: 'Carlos Lima',
    dataAbertura: '2024-03-15', prazo: '2024-03-20',
    descricao: 'Bomba com vazamento, necessária troca de selo mecânico',
    numeroSerie: 'AG1260-55201',
    pecas: ['Selo mecânico', 'Tubagem PTFE'],
    historico: [
      { data: '2024-03-15', evento: 'OS aberta - cliente relatou vazamento' },
      { data: '2024-03-16', evento: 'Técnico em deslocamento' },
      { data: '2024-03-16', evento: 'Diagnóstico: selo mecânico danificado' },
    ],
  },
  {
    id: '2', numero: 'OS-0046', cliente: 'Farmacêutica XYZ', equipamento: 'GC Shimadzu 2030', marca: 'Shimadzu',
    tipo: 'calibracao', prioridade: 'alta', status: 'aberta', tecnico: 'Pedro Santos',
    dataAbertura: '2024-03-14', prazo: '2024-03-22',
    descricao: 'Calibração anual programada',
    numeroSerie: 'SH2030-88102',
    pecas: ['Kit calibração GC'],
    historico: [
      { data: '2024-03-14', evento: 'OS aberta - calibração programada' },
    ],
  },
  {
    id: '3', numero: 'OS-0047', cliente: 'Hospital São Paulo', equipamento: 'Dissolutor Raytor RT-600', marca: 'Raytor',
    tipo: 'instalacao', prioridade: 'media', status: 'aguardando_pecas', tecnico: 'Ana Costa',
    dataAbertura: '2024-03-13', prazo: '2024-03-25',
    descricao: 'Instalação e qualificação do equipamento',
    numeroSerie: 'RT600-44001',
    pecas: ['Cesto pás 50mL', 'Cesto aparato 1'],
    historico: [
      { data: '2024-03-13', evento: 'OS aberta para instalação' },
      { data: '2024-03-14', evento: 'Aguardando chegada dos cestos complementares' },
    ],
  },
  {
    id: '4', numero: 'OS-0048', cliente: 'Universidade Federal', equipamento: 'HPLC Waters e2695', marca: 'Waters',
    tipo: 'manutencao_preventiva', prioridade: 'baixa', status: 'aguardando_aprovacao', tecnico: 'Carlos Lima',
    dataAbertura: '2024-03-12', prazo: '2024-03-28',
    descricao: 'Manutenção preventiva semestral',
    numeroSerie: 'WE2695-33201',
    historico: [
      { data: '2024-03-12', evento: 'OS aberta - preventiva semestral' },
      { data: '2024-03-13', evento: 'Proposta enviada, aguardando aprovação do cliente' },
    ],
  },
  {
    id: '5', numero: 'OS-0049', cliente: 'Petroquímica ABC', equipamento: 'GC Agilent 7890B', marca: 'Agilent',
    tipo: 'qualificacao', prioridade: 'alta', status: 'em_andamento', tecnico: 'Pedro Santos',
    dataAbertura: '2024-03-11', prazo: '2024-03-18',
    descricao: 'Qualificação IQ/OQ após mudança de laboratório',
    numeroSerie: 'AG7890-99001',
    historico: [
      { data: '2024-03-11', evento: 'OS aberta para qualificação IQ/OQ' },
      { data: '2024-03-12', evento: 'IQ concluída com sucesso' },
      { data: '2024-03-13', evento: 'OQ em andamento' },
    ],
  },
  {
    id: '6', numero: 'OS-0050', cliente: 'Lab. Pesquisa USP', equipamento: 'Pipeta Gilson Pipetman P1000', marca: 'Gilson',
    tipo: 'calibracao', prioridade: 'media', status: 'concluida', tecnico: 'Ana Costa',
    dataAbertura: '2024-03-10', prazo: '2024-03-15',
    descricao: 'Calibração de pipeta',
    numeroSerie: 'GIL-P1000-771',
    historico: [
      { data: '2024-03-10', evento: 'OS aberta' },
      { data: '2024-03-11', evento: 'Calibração realizada' },
      { data: '2024-03-11', evento: 'Certificado emitido' },
    ],
  },
  {
    id: '7', numero: 'OS-0051', cliente: 'Laboratório ABC', equipamento: 'HPLC Agilent 1260 - Detector DAD', marca: 'Agilent',
    tipo: 'suporte_tecnico', prioridade: 'critica', status: 'aberta', tecnico: 'Carlos Lima',
    dataAbertura: '2024-03-16', prazo: '2024-03-17',
    descricao: 'Detector DAD sem resposta, equipamento parado',
    numeroSerie: 'AG1260-55201-DAD',
    historico: [
      { data: '2024-03-16', evento: 'OS aberta - emergência, equipamento parado' },
    ],
  },
  {
    id: '8', numero: 'OS-0052', cliente: 'Farmacêutica XYZ', equipamento: 'Dissolutor Hanson SR8', marca: 'Hanson',
    tipo: 'treinamento', prioridade: 'baixa', status: 'concluida', tecnico: 'Ana Costa',
    dataAbertura: '2024-03-08', prazo: '2024-03-09',
    descricao: 'Treinamento de operação para novos analistas',
    historico: [
      { data: '2024-03-08', evento: 'OS aberta' },
      { data: '2024-03-09', evento: 'Treinamento realizado com 3 analistas' },
      { data: '2024-03-09', evento: 'OS concluída' },
    ],
  },
];

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  aberta: { label: 'Aberta', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_andamento: { label: 'Em Andamento', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  aguardando_pecas: { label: 'Aguardando Peças', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  aguardando_aprovacao: { label: 'Aguardando Aprovação', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  concluida: { label: 'Concluída', className: 'bg-green-100 text-green-800 border-green-200' },
  cancelada: { label: 'Cancelada', className: 'bg-red-100 text-red-800 border-red-200' },
};

const PRIORIDADE_CONFIG: Record<string, { label: string; className: string }> = {
  baixa: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  media: { label: 'Média', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  alta: { label: 'Alta', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  critica: { label: 'Crítica', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function OrdensServico() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroTecnico, setFiltroTecnico] = useState('todos');
  const [osSelecionada, setOsSelecionada] = useState<OrdemServico | null>(null);

  const tecnicos = useMemo(() => [...new Set(MOCK_ORDENS.map((o) => o.tecnico))], []);

  const ordensFiltradas = useMemo(() => {
    return MOCK_ORDENS.filter((o) => {
      const matchBusca =
        o.numero.toLowerCase().includes(busca.toLowerCase()) ||
        o.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        o.equipamento.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || o.status === filtroStatus;
      const matchPrioridade = filtroPrioridade === 'todos' || o.prioridade === filtroPrioridade;
      const matchTipo = filtroTipo === 'todos' || o.tipo === filtroTipo;
      const matchTecnico = filtroTecnico === 'todos' || o.tecnico === filtroTecnico;
      return matchBusca && matchStatus && matchPrioridade && matchTipo && matchTecnico;
    });
  }, [busca, filtroStatus, filtroPrioridade, filtroTipo, filtroTecnico]);

  const rowClassName = (o: OrdemServico) => {
    if (o.prioridade === 'critica' && (o.status === 'aberta' || o.status === 'em_andamento')) return 'bg-red-50 hover:bg-red-100';
    if (o.status === 'aguardando_pecas') return 'bg-amber-50 hover:bg-amber-100';
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ordens de Serviço</h1>
          <p className="text-muted-foreground">Assistência Técnica Multimarcas</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nova OS
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">34</p>
              <p className="text-xs text-muted-foreground">OS Abertas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Em Andamento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <Package className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Aguardando Peça</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">28</p>
              <p className="text-xs text-muted-foreground">Concluídas Mês</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar OS, cliente ou equipamento..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Status</SelectItem>
              {STATUS_OS.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas</SelectItem>
              {PRIORIDADES.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Tipos</SelectItem>
              {TIPOS_OS.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroTecnico} onValueChange={setFiltroTecnico}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Técnico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {tecnicos.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº OS</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Técnico</TableHead>
              <TableHead>Data Abertura</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordensFiltradas.map((o) => (
              <TableRow key={o.id} className={rowClassName(o)}>
                <TableCell className="font-mono text-xs font-medium">{o.numero}</TableCell>
                <TableCell className="font-medium">{o.cliente}</TableCell>
                <TableCell>{o.equipamento}</TableCell>
                <TableCell>{o.marca}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {TIPOS_OS.find((t) => t.value === o.tipo)?.label ?? o.tipo}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={PRIORIDADE_CONFIG[o.prioridade]?.className}>
                    {PRIORIDADE_CONFIG[o.prioridade]?.label ?? o.prioridade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[o.status]?.className}>
                    {STATUS_CONFIG[o.status]?.label ?? o.status}
                  </Badge>
                </TableCell>
                <TableCell>{o.tecnico}</TableCell>
                <TableCell>{formatarData(o.dataAbertura)}</TableCell>
                <TableCell>{formatarData(o.prazo)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => setOsSelecionada(o)}>
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!osSelecionada} onOpenChange={(open) => !open && setOsSelecionada(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{osSelecionada?.numero}</SheetTitle>
            <SheetDescription>
              {osSelecionada?.equipamento} - {osSelecionada?.cliente}
            </SheetDescription>
          </SheetHeader>

          {osSelecionada && (
            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Informações do Cliente</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Cliente:</span> {osSelecionada.cliente}</div>
                  <div><span className="text-muted-foreground">Marca:</span> {osSelecionada.marca}</div>
                  <div><span className="text-muted-foreground">Equipamento:</span> {osSelecionada.equipamento}</div>
                  {osSelecionada.numeroSerie && (
                    <div><span className="text-muted-foreground">Nº Série:</span> <span className="font-mono text-xs">{osSelecionada.numeroSerie}</span></div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Detalhes</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Tipo:</span> {TIPOS_OS.find((t) => t.value === osSelecionada.tipo)?.label}</div>
                  <div><span className="text-muted-foreground">Prioridade:</span> <Badge variant="outline" className={PRIORIDADE_CONFIG[osSelecionada.prioridade]?.className}>{PRIORIDADE_CONFIG[osSelecionada.prioridade]?.label}</Badge></div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={STATUS_CONFIG[osSelecionada.status]?.className}>{STATUS_CONFIG[osSelecionada.status]?.label}</Badge></div>
                  <div><span className="text-muted-foreground">Técnico:</span> {osSelecionada.tecnico}</div>
                  <div><span className="text-muted-foreground">Abertura:</span> {formatarData(osSelecionada.dataAbertura)}</div>
                  <div><span className="text-muted-foreground">Prazo:</span> {formatarData(osSelecionada.prazo)}</div>
                </div>
                {osSelecionada.descricao && (
                  <p className="text-sm mt-2"><span className="text-muted-foreground">Descrição:</span> {osSelecionada.descricao}</p>
                )}
              </div>

              {osSelecionada.pecas && osSelecionada.pecas.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Peças Necessárias</h3>
                    <ul className="space-y-1">
                      {osSelecionada.pecas.map((peca, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <Package className="h-3 w-3 text-muted-foreground" />
                          {peca}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {osSelecionada.historico && osSelecionada.historico.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Timeline</h3>
                    <div className="space-y-3">
                      {osSelecionada.historico.map((h, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                            {i < osSelecionada.historico!.length - 1 && (
                              <div className="w-px flex-1 bg-border mt-1" />
                            )}
                          </div>
                          <div className="pb-3">
                            <p className="text-muted-foreground text-xs">{formatarData(h.data)}</p>
                            <p>{h.evento}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
