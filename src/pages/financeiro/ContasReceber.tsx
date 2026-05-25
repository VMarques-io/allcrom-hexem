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

interface ContaReceber {
  id: string;
  cliente: string;
  numeroPedido: string;
  valor: number;
  vencimento: string;
  status: 'recebido' | 'pendente' | 'vencido';
  formaPagamento: string;
}

const MOCK_CONTAS: ContaReceber[] = [
  { id: '1', cliente: 'Farmácias Magnum', numeroPedido: 'PED-2024-0847', valor: 28450, vencimento: '2024-11-20', status: 'recebido', formaPagamento: 'Boleto' },
  { id: '2', cliente: 'BioGen Biotecnologia', numeroPedido: 'PED-2024-0846', valor: 156200, vencimento: '2024-11-25', status: 'pendente', formaPagamento: 'Transferência' },
  { id: '3', cliente: 'Química Analítica Ltda', numeroPedido: 'PED-2024-0845', valor: 42300, vencimento: '2024-11-08', status: 'vencido', formaPagamento: 'Boleto' },
  { id: '4', cliente: 'Alimentos Bom Sabor', numeroPedido: 'PED-2024-0844', valor: 18700, vencimento: '2024-11-30', status: 'pendente', formaPagamento: 'Cartão' },
  { id: '5', cliente: 'LabCrom Análises', numeroPedido: 'PED-2024-0843', valor: 95600, vencimento: '2024-11-03', status: 'vencido', formaPagamento: 'Transferência' },
  { id: '6', cliente: 'FarmaBrasil', numeroPedido: 'PED-2024-0840', valor: 67800, vencimento: '2024-11-22', status: 'pendente', formaPagamento: 'Boleto' },
  { id: '7', cliente: 'Instituto de Pesquisas Bio', numeroPedido: 'PED-2024-0838', valor: 234500, vencimento: '2024-11-15', status: 'recebido', formaPagamento: 'Transferência' },
  { id: '8', cliente: 'ChemTech Solutions', numeroPedido: 'PED-2024-0835', valor: 31200, vencimento: '2024-12-05', status: 'pendente', formaPagamento: 'Boleto' },
];

const STATUS_CONFIG = {
  recebido: { label: 'Recebido', className: 'bg-green-100 text-green-800 border-green-200' },
  pendente: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  vencido: { label: 'Vencido', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function ContasReceber() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const contasFiltradas = useMemo(() => {
    return MOCK_CONTAS.filter((c) => {
      const matchBusca =
        c.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        c.numeroPedido.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  const vencidas = MOCK_CONTAS.filter((c) => c.status === 'vencido');
  const totalVencidas = vencidas.reduce((acc, c) => acc + c.valor, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contas a Receber</h1>
        <p className="text-muted-foreground">Acompanhamento de recebíveis e títulos de clientes</p>
      </div>

      {vencidas.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
            <div>
              <p className="font-medium text-red-800">
                {vencidas.length} título(s) vencido(s) - Total: {formatarMoeda(totalVencidas)}
              </p>
              <p className="text-sm text-red-600">Acesse os clientes com títulos em atraso.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente ou pedido..."
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
              <SelectItem value="recebido">Recebido</SelectItem>
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
              <TableHead>Cliente</TableHead>
              <TableHead>Nº Pedido</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Forma Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contasFiltradas.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.cliente}</TableCell>
                <TableCell className="font-mono text-xs">{c.numeroPedido}</TableCell>
                <TableCell className="font-medium">{formatarMoeda(c.valor)}</TableCell>
                <TableCell>{formatarData(c.vencimento)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[c.status].className}>
                    {STATUS_CONFIG[c.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">{c.formaPagamento}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
