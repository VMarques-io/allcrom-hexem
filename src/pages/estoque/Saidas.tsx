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

interface SaidaEstoque {
  id: string;
  data: string;
  produto: string;
  qtd: number;
  destino: string;
  numeroPedido: string;
  tipo: 'venda' | 'consumo_interno' | 'amostra';
  observacao: string;
}

const MOCK_SAIDAS: SaidaEstoque[] = [
  { id: 'SAI-001', data: '2024-03-15', produto: 'Coluna Luna C18 150x4.6mm', qtd: 2, destino: 'Laboratório ABC', numeroPedido: 'PED-1025', tipo: 'venda', observacao: '' },
  { id: 'SAI-002', data: '2024-03-14', produto: 'Seringa Hamilton 100μL', qtd: 3, destino: 'Assistência Técnica', numeroPedido: '-', tipo: 'consumo_interno', observacao: 'Manutenção OS-0045' },
  { id: 'SAI-003', data: '2024-03-13', produto: 'Dispositivo Tasso M20', qtd: 10, destino: 'Hospital São Paulo', numeroPedido: 'PED-1028', tipo: 'venda', observacao: '' },
  { id: 'SAI-004', data: '2024-03-12', produto: 'Mitra VAMS 30μL', qtd: 5, destino: 'Lab. Pesquisa USP', numeroPedido: 'PED-1030', tipo: 'amostra', observacao: 'Amostra para avaliação' },
  { id: 'SAI-005', data: '2024-03-11', produto: 'Pipeta Pipetman P200', qtd: 1, destino: 'Qualidade', numeroPedido: '-', tipo: 'consumo_interno', observacao: 'Calibração interna' },
  { id: 'SAI-006', data: '2024-03-10', produto: 'Coluna Kinetex C18 100x4.6mm', qtd: 1, destino: 'Farmacêutica XYZ', numeroPedido: 'PED-1032', tipo: 'venda', observacao: '' },
  { id: 'SAI-007', data: '2024-03-09', produto: 'Cartucho Strata-X 200mg', qtd: 10, destino: 'Universidade Federal', numeroPedido: 'PED-1034', tipo: 'venda', observacao: '' },
  { id: 'SAI-008', data: '2024-03-08', produto: 'Coluna ZB-5 30m x 0.25mm', qtd: 2, destino: 'Petroquímica ABC', numeroPedido: 'PED-1036', tipo: 'amostra', observacao: 'Teste de qualificação' },
];

const TIPO_CONFIG = {
  venda: { label: 'Venda', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  consumo_interno: { label: 'Consumo Interno', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  amostra: { label: 'Amostra', className: 'bg-teal-100 text-teal-800 border-teal-200' },
};

export default function Saidas() {
  const [busca, setBusca] = useState('');

  const saidasFiltradas = MOCK_SAIDAS.filter(
    (s) =>
      s.produto.toLowerCase().includes(busca.toLowerCase()) ||
      s.destino.toLowerCase().includes(busca.toLowerCase()) ||
      s.numeroPedido.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saídas</h1>
        <p className="text-muted-foreground">Registro de saídas de estoque</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por produto, destino ou pedido..."
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
              <TableHead>Destino</TableHead>
              <TableHead>Nº Pedido</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Observação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {saidasFiltradas.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{formatarData(s.data)}</TableCell>
                <TableCell className="font-medium">{s.produto}</TableCell>
                <TableCell>{s.qtd}</TableCell>
                <TableCell>{s.destino}</TableCell>
                <TableCell className="font-mono text-xs">{s.numeroPedido}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={TIPO_CONFIG[s.tipo].className}>
                    {TIPO_CONFIG[s.tipo].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{s.observacao || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
