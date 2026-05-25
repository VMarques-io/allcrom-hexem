import { useState, useMemo } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
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
import { formatarData, formatarMoeda } from '@/lib/formatters';

interface ContaPagar {
  id: string;
  fornecedor: string;
  descricao: string;
  valor: number;
  vencimento: string;
  status: 'pago' | 'pendente' | 'vencido';
  centroCusto: string;
}

const MOCK_CONTAS: ContaPagar[] = [
  { id: '1', fornecedor: 'Phenomenex', descricao: 'Colunas HPLC - Lote 2024A', valor: 34500, vencimento: '2024-11-10', status: 'pago', centroCusto: 'Estoque' },
  { id: '2', fornecedor: 'Hamilton', descricao: 'Seringas 100µL - Reposição', valor: 12800, vencimento: '2024-11-18', status: 'pendente', centroCusto: 'Estoque' },
  { id: '3', fornecedor: 'Gilson', descricao: 'Pipetas Pipetman - Pedido PC-003', valor: 18900, vencimento: '2024-11-05', status: 'vencido', centroCusto: 'Estoque' },
  { id: '4', fornecedor: 'Tasso Inc.', descricao: 'Dispositivos Tasso M20', valor: 22400, vencimento: '2024-11-25', status: 'pendente', centroCusto: 'Saúde' },
  { id: '5', fornecedor: 'Restek', descricao: 'Colunas GC ZB-5', valor: 9700, vencimento: '2024-10-28', status: 'vencido', centroCusto: 'Estoque' },
  { id: '6', fornecedor: 'Aluguel Escritório', descricao: 'Aluguel Nov/2024', valor: 8500, vencimento: '2024-11-05', status: 'pago', centroCusto: 'Administrativo' },
  { id: '7', fornecedor: 'Neoteryx', descricao: 'Mitra VAMS - Kit Microamostragem', valor: 15600, vencimento: '2024-12-01', status: 'pendente', centroCusto: 'Saúde' },
  { id: '8', fornecedor: 'Sigma-Aldrich', descricao: 'Reagentes análise - Lote Q4', valor: 6200, vencimento: '2024-11-30', status: 'pendente', centroCusto: 'Estoque' },
];

const STATUS_CONFIG = {
  pago: { label: 'Pago', className: 'bg-green-100 text-green-800 border-green-200' },
  pendente: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  vencido: { label: 'Vencido', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function ContasPagar() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const contasFiltradas = useMemo(() => {
    return MOCK_CONTAS.filter((c) => {
      const matchBusca =
        c.fornecedor.toLowerCase().includes(busca.toLowerCase()) ||
        c.descricao.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  const vencidas = MOCK_CONTAS.filter((c) => c.status === 'vencido');
  const totalVencidas = vencidas.reduce((acc, c) => acc + c.valor, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contas a Pagar</h1>
        <p className="text-muted-foreground">Controle de títulos e obrigações com fornecedores</p>
      </div>

      {vencidas.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
            <div>
              <p className="font-medium text-red-800">
                {vencidas.length} conta(s) vencida(s) - Total: {formatarMoeda(totalVencidas)}
              </p>
              <p className="text-sm text-red-600">Verifique os títulos em atraso e regularize a situação.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar fornecedor ou descrição..."
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
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="vencido">Vencido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Centro de Custo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contasFiltradas.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.fornecedor}</TableCell>
                <TableCell className="text-muted-foreground">{c.descricao}</TableCell>
                <TableCell className="font-medium">{formatarMoeda(c.valor)}</TableCell>
                <TableCell>{formatarData(c.vencimento)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[c.status].className}>
                    {STATUS_CONFIG[c.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">{c.centroCusto}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
