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
import { formatarData, formatarMoeda } from '@/lib/formatters';

interface PedidoCompra {
  id: string;
  numero: string;
  fornecedor: string;
  valor: number;
  data: string;
  previsao: string;
  status: 'emitido' | 'confirmado' | 'em_producao' | 'expedido' | 'entregue';
}

const MOCK_PEDIDOS: PedidoCompra[] = [
  { id: '1', numero: 'PC-001', fornecedor: 'Phenomenex', valor: 22500.0, data: '2024-03-15', previsao: '2024-03-30', status: 'emitido' },
  { id: '2', numero: 'PC-002', fornecedor: 'Hamilton', valor: 8900.0, data: '2024-03-12', previsao: '2024-03-22', status: 'confirmado' },
  { id: '3', numero: 'PC-003', fornecedor: 'Gilson', valor: 18000.0, data: '2024-03-10', previsao: '2024-03-30', status: 'em_producao' },
  { id: '4', numero: 'PC-004', fornecedor: 'Tasso', valor: 12400.0, data: '2024-03-08', previsao: '2024-03-15', status: 'expedido' },
  { id: '5', numero: 'PC-005', fornecedor: 'Restek', valor: 9700.0, data: '2024-03-05', previsao: '2024-03-20', status: 'entregue' },
];

const STATUS_CONFIG = {
  emitido: { label: 'Emitido', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  confirmado: { label: 'Confirmado', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_producao: { label: 'Em Produção', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  expedido: { label: 'Expedido', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  entregue: { label: 'Entregue', className: 'bg-green-100 text-green-800 border-green-200' },
};

export default function PedidosCompra() {
  const [busca, setBusca] = useState('');

  const pedidosFiltrados = MOCK_PEDIDOS.filter(
    (p) =>
      p.numero.toLowerCase().includes(busca.toLowerCase()) ||
      p.fornecedor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pedidos de Compra</h1>
        <p className="text-muted-foreground">Pedidos emitidos para fornecedores</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar pedido ou fornecedor..."
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
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Previsão</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidosFiltrados.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs font-medium">{p.numero}</TableCell>
                <TableCell className="font-medium">{p.fornecedor}</TableCell>
                <TableCell className="font-medium">{formatarMoeda(p.valor)}</TableCell>
                <TableCell>{formatarData(p.data)}</TableCell>
                <TableCell>{formatarData(p.previsao)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[p.status].className}>
                    {STATUS_CONFIG[p.status].label}
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
