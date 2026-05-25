import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatarData, formatarMoeda } from '@/lib/formatters';
import { STATUS_PEDIDO } from '@/lib/constants';

interface PedidoVenda {
  id: string;
  numero: string;
  cliente: string;
  valorTotal: number;
  status: string;
  data: string;
  previsaoEntrega: string;
  vendedor: string;
  segmento: string;
  itens: number;
}

const MOCK_PEDIDOS: PedidoVenda[] = [
  { id: '1', numero: 'PV-2024-001', cliente: 'BioGen Biotecnologia', valorTotal: 284500, status: 'confirmado', data: '2024-03-15', previsaoEntrega: '2024-04-01', vendedor: 'Carlos', segmento: 'biotecnologia', itens: 5 },
  { id: '2', numero: 'PV-2024-002', cliente: 'Farmacêutica Magnum', valorTotal: 45200, status: 'confirmado', data: '2024-03-14', previsaoEntrega: '2024-03-28', vendedor: 'Ana', segmento: 'cromatografia', itens: 3 },
  { id: '3', numero: 'PV-2024-003', cliente: 'LabCrom Análises', valorTotal: 156000, status: 'em_producao', data: '2024-03-13', previsaoEntrega: '2024-04-05', vendedor: 'João', segmento: 'cromatografia', itens: 8 },
  { id: '4', numero: 'PV-2024-004', cliente: 'Alimentos Bom Sabor', valorTotal: 12800, status: 'em_producao', data: '2024-03-12', previsaoEntrega: '2024-03-30', vendedor: 'Carlos', segmento: 'cromatografia', itens: 2 },
  { id: '5', numero: 'PV-2024-005', cliente: 'Instituto Biomédico', valorTotal: 89000, status: 'expedido', data: '2024-03-10', previsaoEntrega: '2024-03-25', vendedor: 'Ana', segmento: 'biotecnologia', itens: 4 },
  { id: '6', numero: 'PV-2024-006', cliente: 'Química Analítica Ltda', valorTotal: 32000, status: 'expedido', data: '2024-03-09', previsaoEntrega: '2024-03-20', vendedor: 'João', segmento: 'cromatografia', itens: 6 },
  { id: '7', numero: 'PV-2024-007', cliente: 'Hospitais Unidos', valorTotal: 234000, status: 'em_transito', data: '2024-03-08', previsaoEntrega: '2024-03-18', vendedor: 'Carlos', segmento: 'saude', itens: 10 },
  { id: '8', numero: 'PV-2024-008', cliente: 'Cromatografia & Cia', valorTotal: 5200, status: 'em_transito', data: '2024-03-07', previsaoEntrega: '2024-03-17', vendedor: 'Ana', segmento: 'cromatografia', itens: 1 },
  { id: '9', numero: 'PV-2024-009', cliente: 'Universidade Federal', valorTotal: 412000, status: 'entregue', data: '2024-02-28', previsaoEntrega: '2024-03-15', vendedor: 'João', segmento: 'cromatografia', itens: 12 },
  { id: '10', numero: 'PV-2024-010', cliente: 'Petroquímica ABC', valorTotal: 18500, status: 'entregue', data: '2024-02-25', previsaoEntrega: '2024-03-10', vendedor: 'Carlos', segmento: 'cromatografia', itens: 3 },
  { id: '11', numero: 'PV-2024-011', cliente: 'NeoPharma Ltda', valorTotal: 67800, status: 'entregue', data: '2024-02-20', previsaoEntrega: '2024-03-05', vendedor: 'Ana', segmento: 'saude', itens: 7 },
  { id: '12', numero: 'PV-2024-012', cliente: 'ChemTech Solutions', valorTotal: 15000, status: 'faturado', data: '2024-03-11', previsaoEntrega: '2024-03-28', vendedor: 'João', segmento: 'cromatografia', itens: 4 },
  { id: '13', numero: 'PV-2024-013', cliente: 'FarmaBrasil', valorTotal: 95000, status: 'faturado', data: '2024-03-10', previsaoEntrega: '2024-03-27', vendedor: 'Carlos', segmento: 'saude', itens: 5 },
];

const STATUS_PEDIDO_CONFIG: Record<string, { label: string; className: string }> = {
  pendente: { label: 'Pendente', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  confirmado: { label: 'Confirmado', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_producao: { label: 'Em Separação', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  faturado: { label: 'Faturado', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  expedido: { label: 'Expedido', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  em_transito: { label: 'Em Trânsito', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  entregue: { label: 'Entregue', className: 'bg-green-100 text-green-800 border-green-200' },
  cancelado: { label: 'Cancelado', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function PedidosVenda() {
  const [busca, setBusca] = useState('');
  const [aba, setAba] = useState('todos');

  const TABS = [
    { value: 'todos', label: 'Todos' },
    { value: 'confirmado', label: 'Confirmados' },
    { value: 'em_producao', label: 'Em Separação' },
    { value: 'faturado', label: 'Faturados' },
    { value: 'expedido', label: 'Expedidos' },
    { value: 'entregue', label: 'Entregues' },
  ];

  const pedidosFiltrados = useMemo(() => {
    return MOCK_PEDIDOS.filter((p) => {
      const matchBusca =
        p.numero.toLowerCase().includes(busca.toLowerCase()) ||
        p.cliente.toLowerCase().includes(busca.toLowerCase());
      if (aba === 'todos') return matchBusca;
      if (aba === 'expedido') return matchBusca && (p.status === 'expedido' || p.status === 'em_transito');
      return matchBusca && p.status === aba;
    });
  }, [busca, aba]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pedidos de Venda</h1>
        <p className="text-muted-foreground">Acompanhamento de pedidos e entregas</p>
      </div>

      <Tabs value={aba} onValueChange={setAba}>
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="space-y-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar pedido ou cliente..."
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
                      <TableHead>Cliente</TableHead>
                      <TableHead className="text-center">Itens</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Previsão</TableHead>
                      <TableHead>Vendedor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedidosFiltrados.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono text-xs font-medium">{p.numero}</TableCell>
                        <TableCell className="font-medium">{p.cliente}</TableCell>
                        <TableCell className="text-center">{p.itens}</TableCell>
                        <TableCell className="font-medium">{formatarMoeda(p.valorTotal)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={STATUS_PEDIDO_CONFIG[p.status]?.className}>
                            {STATUS_PEDIDO_CONFIG[p.status]?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatarData(p.data)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatarData(p.previsaoEntrega)}</TableCell>
                        <TableCell className="text-muted-foreground">{p.vendedor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}