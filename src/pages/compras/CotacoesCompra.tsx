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
import { formatarMoeda } from '@/lib/formatters';

interface CotacaoCompra {
  id: string;
  numero: string;
  fornecedor: string;
  itens: string;
  valor: number;
  prazoEntrega: string;
  status: 'recebida' | 'em_analise' | 'aprovada' | 'rejeitada';
}

const MOCK_COTACOES: CotacaoCompra[] = [
  { id: '1', numero: 'COT-001', fornecedor: 'Phenomenex', itens: 'Colunas HPLC (Luna, Kinetex)', valor: 22500.0, prazoEntrega: '15 dias', status: 'recebida' },
  { id: '2', numero: 'COT-002', fornecedor: 'Gilson', itens: 'Pipetas Pipetman P200, P1000', valor: 18000.0, prazoEntrega: '20 dias', status: 'em_analise' },
  { id: '3', numero: 'COT-003', fornecedor: 'Hamilton', itens: 'Seringas 100μL, 500μL', valor: 8900.0, prazoEntrega: '10 dias', status: 'aprovada' },
  { id: '4', numero: 'COT-004', fornecedor: 'Tasso', itens: 'Dispositivos M20, S17', valor: 12400.0, prazoEntrega: '7 dias', status: 'recebida' },
  { id: '5', numero: 'COT-005', fornecedor: 'Restek', itens: 'Colunas GC Rxi-5ms', valor: 9700.0, prazoEntrega: '25 dias', status: 'rejeitada' },
];

const STATUS_CONFIG = {
  recebida: { label: 'Recebida', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_analise: { label: 'Em Análise', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  aprovada: { label: 'Aprovada', className: 'bg-green-100 text-green-800 border-green-200' },
  rejeitada: { label: 'Rejeitada', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function CotacoesCompra() {
  const [busca, setBusca] = useState('');

  const cotacoesFiltradas = MOCK_COTACOES.filter(
    (c) =>
      c.numero.toLowerCase().includes(busca.toLowerCase()) ||
      c.fornecedor.toLowerCase().includes(busca.toLowerCase()) ||
      c.itens.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cotações de Compra</h1>
        <p className="text-muted-foreground">Cotações recebidas de fornecedores</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar cotação, fornecedor ou item..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Prazo Entrega</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cotacoesFiltradas.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs font-medium">{c.numero}</TableCell>
                <TableCell className="font-medium">{c.fornecedor}</TableCell>
                <TableCell className="max-w-[200px] truncate">{c.itens}</TableCell>
                <TableCell className="font-medium">{formatarMoeda(c.valor)}</TableCell>
                <TableCell>{c.prazoEntrega}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[c.status].className}>
                    {STATUS_CONFIG[c.status].label}
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
