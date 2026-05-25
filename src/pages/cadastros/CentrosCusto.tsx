import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { formatarMoeda } from '@/lib/formatters';

interface CentroCusto {
  id: string;
  codigo: string;
  descricao: string;
  responsavel: string;
  orcamentoMensal: number;
  utilizado: number;
  status: 'ativo' | 'inativo';
}

const MOCK_CENTROS: CentroCusto[] = [
  { id: '1', codigo: 'CC-001', descricao: 'Administrativo', responsavel: 'Maria Santos', orcamentoMensal: 25000, utilizado: 22400, status: 'ativo' },
  { id: '2', codigo: 'CC-002', descricao: 'Comercial', responsavel: 'João Oliveira', orcamentoMensal: 45000, utilizado: 41200, status: 'ativo' },
  { id: '3', codigo: 'CC-003', descricao: 'Assistência Técnica', responsavel: 'Carlos Lima', orcamentoMensal: 35000, utilizado: 28700, status: 'ativo' },
  { id: '4', codigo: 'CC-004', descricao: 'Marketing', responsavel: 'Ana Costa', orcamentoMensal: 15000, utilizado: 14300, status: 'ativo' },
  { id: '5', codigo: 'CC-005', descricao: 'Logística', responsavel: 'Pedro Almeida', orcamentoMensal: 20000, utilizado: 19500, status: 'ativo' },
  { id: '6', codigo: 'CC-006', descricao: 'P&D', responsavel: 'Roberto Silva', orcamentoMensal: 30000, utilizado: 15600, status: 'inativo' },
];

const STATUS_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  inativo: { label: 'Inativo', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function CentrosCusto() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const centosFiltrados = useMemo(() => {
    return MOCK_CENTROS.filter((c) => {
      const matchBusca =
        c.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        c.codigo.toLowerCase().includes(busca.toLowerCase()) ||
        c.responsavel.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  const getPercentual = (c: CentroCusto) => {
    return Math.round((c.utilizado / c.orcamentoMensal) * 100);
  };

  const getProgressColor = (percentual: number) => {
    if (percentual > 80) return '[&>div]:bg-red-500';
    if (percentual >= 50) return '[&>div]:bg-yellow-500';
    return '[&>div]:bg-green-500';
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Centros de Custo</h1>
        <p className="text-muted-foreground">Gestão de orçamento por centro de custo</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, descrição ou responsável..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Orçamento Mensal</TableHead>
              <TableHead>Utilizado</TableHead>
              <TableHead>% Utilizado</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {centosFiltrados.map((c) => {
              const percentual = getPercentual(c);
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs font-medium">{c.codigo}</TableCell>
                  <TableCell className="font-medium">{c.descricao}</TableCell>
                  <TableCell className="text-muted-foreground">{c.responsavel}</TableCell>
                  <TableCell>{formatarMoeda(c.orcamentoMensal)}</TableCell>
                  <TableCell>{formatarMoeda(c.utilizado)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <Progress value={percentual} className={`h-2 flex-1 ${getProgressColor(percentual)}`} />
                      <span className="text-sm font-medium w-10 text-right">{percentual}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={STATUS_CONFIG[c.status].className}>
                      {STATUS_CONFIG[c.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}