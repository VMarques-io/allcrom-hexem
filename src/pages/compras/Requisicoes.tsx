import { useState } from 'react';
import { Search, Plus, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
import { formatarData } from '@/lib/formatters';
import { PRIORIDADES } from '@/lib/constants';

interface RequisicaoCompra {
  id: string;
  numero: string;
  solicitante: string;
  data: string;
  itens: string;
  status: 'pendente' | 'aprovada' | 'em_cotacao' | 'atendida';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
}

const MOCK_REQUISICOES: RequisicaoCompra[] = [
  { id: '1', numero: 'REQ-001', solicitante: 'Vitor Marques', data: '2024-03-15', itens: '3 itens (Colunas HPLC, Seringas)', status: 'pendente', prioridade: 'alta' },
  { id: '2', numero: 'REQ-002', solicitante: 'Ana Costa', data: '2024-03-14', itens: '1 item (Pipeta P200)', status: 'aprovada', prioridade: 'media' },
  { id: '3', numero: 'REQ-003', solicitante: 'Carlos Lima', data: '2024-03-13', itens: '5 itens (Dispositivos coleta)', status: 'em_cotacao', prioridade: 'alta' },
  { id: '4', numero: 'REQ-004', solicitante: 'Maria Silva', data: '2024-03-12', itens: '2 itens (Dissolutores)', status: 'atendida', prioridade: 'critica' },
  { id: '5', numero: 'REQ-005', solicitante: 'Pedro Santos', data: '2024-03-11', itens: '8 itens (Consumíveis SPE)', status: 'pendente', prioridade: 'baixa' },
  { id: '6', numero: 'REQ-006', solicitante: 'Julia Ferreira', data: '2024-03-10', itens: '2 itens (Freezer -86°C)', status: 'em_cotacao', prioridade: 'critica' },
];

const STATUS_CONFIG = {
  pendente: { label: 'Pendente', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  aprovada: { label: 'Aprovada', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_cotacao: { label: 'Em Cotação', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  atendida: { label: 'Atendida', className: 'bg-green-100 text-green-800 border-green-200' },
};

const PRIORIDADE_CONFIG = {
  baixa: { className: 'bg-gray-100 text-gray-800 border-gray-200' },
  media: { className: 'bg-blue-100 text-blue-800 border-blue-200' },
  alta: { className: 'bg-orange-100 text-orange-800 border-orange-200' },
  critica: { className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function Requisicoes() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const requisicoesFiltradas = MOCK_REQUISICOES.filter((r) => {
    const matchBusca =
      r.numero.toLowerCase().includes(busca.toLowerCase()) ||
      r.solicitante.toLowerCase().includes(busca.toLowerCase()) ||
      r.itens.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || r.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Requisições de Compra</h1>
          <p className="text-muted-foreground">Solicitações de aquisição de materiais e equipamentos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nova Requisição
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar requisição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="aprovada">Aprovada</SelectItem>
              <SelectItem value="em_cotacao">Em Cotação</SelectItem>
              <SelectItem value="atendida">Atendida</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requisicoesFiltradas.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs font-medium">{r.numero}</TableCell>
                <TableCell className="font-medium">{r.solicitante}</TableCell>
                <TableCell>{formatarData(r.data)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{r.itens}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[r.status].className}>
                    {STATUS_CONFIG[r.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={PRIORIDADE_CONFIG[r.prioridade].className}>
                    {PRIORIDADES.find((p) => p.value === r.prioridade)?.label ?? r.prioridade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
