import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatarData } from '@/lib/formatters';

interface EntradaEstoque {
  id: string;
  data: string;
  produto: string;
  qtd: number;
  fornecedor: string;
  numeroNF: string;
  lote: string;
  observacao: string;
  status: 'confirmada' | 'pendente' | 'divergente';
}

const MOCK_ENTRADAS: EntradaEstoque[] = [
  { id: 'ENT-001', data: '2024-03-15', produto: 'Coluna Luna C18 150x4.6mm', qtd: 10, fornecedor: 'Phenomenex', numeroNF: 'NF-55201', lote: 'L2024-001', observacao: 'Pedido regular', status: 'confirmada' },
  { id: 'ENT-002', data: '2024-03-14', produto: 'Pipeta Pipetman P1000', qtd: 5, fornecedor: 'Gilson', numeroNF: 'NF-33892', lote: 'L2024-004', observacao: 'Reposição', status: 'confirmada' },
  { id: 'ENT-003', data: '2024-03-13', produto: 'Seringa Hamilton 100μL', qtd: 20, fornecedor: 'Hamilton', numeroNF: 'NF-77123', lote: 'L2024-006', observacao: '', status: 'pendente' },
  { id: 'ENT-004', data: '2024-03-12', produto: 'Dispositivo Tasso M20', qtd: 100, fornecedor: 'Tasso', numeroNF: 'NF-22045', lote: 'L2024-009', observacao: 'Lote novo', status: 'confirmada' },
  { id: 'ENT-005', data: '2024-03-11', produto: 'Mitra VAMS 30μL', qtd: 200, fornecedor: 'Mitra', numeroNF: 'NF-44098', lote: 'L2024-011', observacao: '', status: 'confirmada' },
  { id: 'ENT-006', data: '2024-03-10', produto: 'Cartucho Strata-X 200mg', qtd: 50, fornecedor: 'Phenomenex', numeroNF: 'NF-55215', lote: 'L2024-012', observacao: 'Qtd divergente da NF', status: 'divergente' },
  { id: 'ENT-007', data: '2024-03-09', produto: 'Coluna ZB-5 30m x 0.25mm', qtd: 8, fornecedor: 'Phenomenex', numeroNF: 'NF-55218', lote: 'L2024-003', observacao: '', status: 'confirmada' },
  { id: 'ENT-008', data: '2024-03-08', produto: 'Coluna Restek Rxi-5ms 30m', qtd: 6, fornecedor: 'Restek', numeroNF: 'NF-88001', lote: 'L2024-015', observacao: 'Aguardando conferência', status: 'pendente' },
];

const STATUS_CONFIG = {
  confirmada: { label: 'Confirmada', className: 'bg-green-100 text-green-800 border-green-200' },
  pendente: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  divergente: { label: 'Divergente', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function Entradas() {
  const [busca, setBusca] = useState('');

  const entradasFiltradas = MOCK_ENTRADAS.filter(
    (e) =>
      e.produto.toLowerCase().includes(busca.toLowerCase()) ||
      e.numeroNF.toLowerCase().includes(busca.toLowerCase()) ||
      e.fornecedor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Entradas</h1>
        <p className="text-muted-foreground">Registro de entradas de estoque</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por produto, NF ou fornecedor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Qtd</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Nº NF</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Observação</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entradasFiltradas.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{formatarData(e.data)}</TableCell>
                <TableCell className="font-medium">{e.produto}</TableCell>
                <TableCell>{e.qtd}</TableCell>
                <TableCell>{e.fornecedor}</TableCell>
                <TableCell className="font-mono text-xs">{e.numeroNF}</TableCell>
                <TableCell className="font-mono text-xs">{e.lote}</TableCell>
                <TableCell className="text-muted-foreground">{e.observacao || '-'}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[e.status].className}>
                    {STATUS_CONFIG[e.status].label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
