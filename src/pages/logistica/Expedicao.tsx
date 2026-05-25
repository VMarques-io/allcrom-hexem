import { useState } from 'react';
import { Search, Truck } from 'lucide-react';
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

interface Expedicao {
  id: string;
  numeroPedido: string;
  cliente: string;
  cidadeUF: string;
  transportadora: string;
  previsaoEntrega: string;
  status: 'preparando' | 'expedido' | 'em_transito' | 'entregue';
  rastreio: string;
}

const MOCK_EXPEDICOES: Expedicao[] = [
  { id: 'EXP-001', numeroPedido: 'PED-1025', cliente: 'Laboratório ABC', cidadeUF: 'São Paulo/SP', transportadora: 'Jadlog', previsaoEntrega: '2024-03-18', status: 'em_transito', rastreio: 'JDL884729105' },
  { id: 'EXP-002', numeroPedido: 'PED-1028', cliente: 'Hospital São Paulo', cidadeUF: 'São Paulo/SP', transportadora: 'Total Express', previsaoEntrega: '2024-03-17', status: 'entregue', rastreio: 'TEX550192837' },
  { id: 'EXP-003', numeroPedido: 'PED-1030', cliente: 'Lab. Pesquisa USP', cidadeUF: 'São Paulo/SP', transportadora: 'Correios (SEDEX)', previsaoEntrega: '2024-03-20', status: 'expedido', rastreio: 'SX982736451' },
  { id: 'EXP-004', numeroPedido: 'PED-1032', cliente: 'Farmacêutica XYZ', cidadeUF: 'Rio de Janeiro/RJ', transportadora: 'Jadlog', previsaoEntrega: '2024-03-19', status: 'preparando', rastreio: '-' },
  { id: 'EXP-005', numeroPedido: 'PED-1034', cliente: 'Universidade Federal', cidadeUF: 'Belo Horizonte/MG', transportadora: 'Correios (PAC)', previsaoEntrega: '2024-03-25', status: 'em_transito', rastreio: 'PJ112938475' },
  { id: 'EXP-006', numeroPedido: 'PED-1036', cliente: 'Petroquímica ABC', cidadeUF: 'Campinas/SP', transportadora: 'Total Express', previsaoEntrega: '2024-03-16', status: 'entregue', rastreio: 'TEX550192900' },
];

const STATUS_CONFIG = {
  preparando: { label: 'Preparando', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  expedido: { label: 'Expedido', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_transito: { label: 'Em Trânsito', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  entregue: { label: 'Entregue', className: 'bg-green-100 text-green-800 border-green-200' },
};

export default function Expedicao() {
  const [busca, setBusca] = useState('');

  const expedicoesFiltradas = MOCK_EXPEDICOES.filter(
    (e) =>
      e.numeroPedido.toLowerCase().includes(busca.toLowerCase()) ||
      e.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      e.cidadeUF.toLowerCase().includes(busca.toLowerCase()) ||
      e.rastreio.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Truck className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Expedição</h1>
          <p className="text-muted-foreground">Acompanhamento de entregas e envios</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar pedido, cliente ou rastreio..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Cidade/UF</TableHead>
              <TableHead>Transportadora</TableHead>
              <TableHead>Previsão Entrega</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rastreio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expedicoesFiltradas.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-mono text-xs font-medium">{e.numeroPedido}</TableCell>
                <TableCell className="font-medium">{e.cliente}</TableCell>
                <TableCell>{e.cidadeUF}</TableCell>
                <TableCell>{e.transportadora}</TableCell>
                <TableCell>{formatarData(e.previsaoEntrega)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[e.status].className}>
                    {STATUS_CONFIG[e.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{e.rastreio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
