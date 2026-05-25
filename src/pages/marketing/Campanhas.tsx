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
import { formatarMoeda } from '@/lib/formatters';

interface Campanha {
  id: string;
  nome: string;
  tipo: 'email' | 'social' | 'evento' | 'paid';
  status: 'ativa' | 'pausada' | 'concluida';
  orcamento: number;
  gasto: number;
  leadsGerados: number;
  roi: number;
}

const MOCK_CAMPANHAS: Campanha[] = [
  { id: '1', nome: 'Webinar HPLC - Impurezas Semaglutida', tipo: 'email', status: 'ativa', orcamento: 8500, gasto: 5200, leadsGerados: 48, roi: 3.2 },
  { id: '2', nome: 'LinkedIn Ads - Cromatografia', tipo: 'social', status: 'ativa', orcamento: 12000, gasto: 7800, leadsGerados: 62, roi: 2.8 },
  { id: '3', nome: 'ANALÍTICA 2026 - Presença', tipo: 'evento', status: 'ativa', orcamento: 45000, gasto: 12000, leadsGerados: 35, roi: 1.5 },
  { id: '4', nome: 'Google Ads - Microamostragem VAMS', tipo: 'paid', status: 'pausada', orcamento: 6000, gasto: 5400, leadsGerados: 28, roi: 2.1 },
  { id: '5', nome: 'Newsletter Q3 - Produtos Saúde', tipo: 'email', status: 'concluida', orcamento: 3200, gasto: 3200, leadsGerados: 22, roi: 4.1 },
];

const TIPO_CONFIG = {
  email: { label: 'E-mail', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  social: { label: 'Social', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  evento: { label: 'Evento', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  paid: { label: 'Paid Media', className: 'bg-green-100 text-green-800 border-green-200' },
};

const STATUS_CONFIG = {
  ativa: { label: 'Ativa', className: 'bg-green-100 text-green-800 border-green-200' },
  pausada: { label: 'Pausada', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  concluida: { label: 'Concluída', className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

export default function Campanhas() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const campanhasFiltradas = useMemo(() => {
    return MOCK_CAMPANHAS.filter((c) => {
      const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campanhas</h1>
        <p className="text-muted-foreground">Gestão de campanhas de marketing e captação</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar campanha..."
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
              <SelectItem value="ativa">Ativa</SelectItem>
              <SelectItem value="pausada">Pausada</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Orçamento</TableHead>
              <TableHead className="text-right">Gasto</TableHead>
              <TableHead className="text-right">Leads Gerados</TableHead>
              <TableHead className="text-right">ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campanhasFiltradas.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.nome}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={TIPO_CONFIG[c.tipo].className}>
                    {TIPO_CONFIG[c.tipo].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[c.status].className}>
                    {STATUS_CONFIG[c.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{formatarMoeda(c.orcamento)}</TableCell>
                <TableCell className="text-right font-mono">{formatarMoeda(c.gasto)}</TableCell>
                <TableCell className="text-right">{c.leadsGerados}</TableCell>
                <TableCell className="text-right font-bold text-green-600">{c.roi.toFixed(1)}x</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
