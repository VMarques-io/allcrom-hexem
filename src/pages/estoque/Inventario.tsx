import { useState, useMemo } from 'react';
import { AlertTriangle, Search, Package, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { CATEGORIAS_PRODUTO, MARCAS_REPRESENTADAS } from '@/lib/constants';
import { formatarMoeda } from '@/lib/formatters';

interface ProdutoEstoque {
  sku: string;
  descricao: string;
  categoria: string;
  marca: string;
  qtdAtual: number;
  qtdMinima: number;
  reservada: number;
  custoMedio: number;
  localizacao: string;
  lote: string;
  statusEstoque: 'normal' | 'alerta' | 'critico';
}

const MOCK_PRODUTOS: ProdutoEstoque[] = [
  { sku: 'PHX-LC-001', descricao: 'Coluna Luna C18 150x4.6mm 5μm', categoria: 'colunas_hplc', marca: 'Phenomenex', qtdAtual: 12, qtdMinima: 5, reservada: 3, custoMedio: 1850.0, localizacao: 'A1-03', lote: 'L2024-001', statusEstoque: 'normal' },
  { sku: 'PHX-LC-002', descricao: 'Coluna Kinetex C18 100x4.6mm 2.6μm', categoria: 'colunas_hplc', marca: 'Phenomenex', qtdAtual: 3, qtdMinima: 5, reservada: 1, custoMedio: 2200.0, localizacao: 'A1-04', lote: 'L2024-002', statusEstoque: 'critico' },
  { sku: 'PHX-GC-001', descricao: 'Coluna ZB-5 30m x 0.25mm 0.25μm', categoria: 'colunas_gc', marca: 'Phenomenex', qtdAtual: 7, qtdMinima: 3, reservada: 2, custoMedio: 1650.0, localizacao: 'A2-01', lote: 'L2024-003', statusEstoque: 'normal' },
  { sku: 'GIL-PIP-001', descricao: 'Pipeta Pipetman P1000', categoria: 'pipetas', marca: 'Gilson', qtdAtual: 4, qtdMinima: 3, reservada: 1, custoMedio: 3200.0, localizacao: 'B1-02', lote: 'L2024-004', statusEstoque: 'normal' },
  { sku: 'GIL-PIP-002', descricao: 'Pipeta Pipetman P200', categoria: 'pipetas', marca: 'Gilson', qtdAtual: 2, qtdMinima: 3, reservada: 2, custoMedio: 2800.0, localizacao: 'B1-03', lote: 'L2024-005', statusEstoque: 'alerta' },
  { sku: 'HAM-SER-001', descricao: 'Seringa Hamilton 100μL', categoria: 'seringas', marca: 'Hamilton', qtdAtual: 15, qtdMinima: 8, reservada: 4, custoMedio: 450.0, localizacao: 'B2-01', lote: 'L2024-006', statusEstoque: 'normal' },
  { sku: 'HAM-SER-002', descricao: 'Seringa Hamilton 500μL', categoria: 'seringas', marca: 'Hamilton', qtdAtual: 1, qtdMinima: 5, reservada: 1, custoMedio: 580.0, localizacao: 'B2-02', lote: 'L2024-007', statusEstoque: 'critico' },
  { sku: 'RAY-DIS-001', descricao: 'Dissolutor Raytor RT-600', categoria: 'dissolutores', marca: 'Raytor', qtdAtual: 2, qtdMinima: 1, reservada: 0, custoMedio: 45000.0, localizacao: 'C1-01', lote: 'L2024-008', statusEstoque: 'normal' },
  { sku: 'TAS-M20-001', descricao: 'Dispositivo Tasso M20', categoria: 'dispositivos_coleta', marca: 'Tasso', qtdAtual: 50, qtdMinima: 20, reservada: 10, custoMedio: 85.0, localizacao: 'D1-01', lote: 'L2024-009', statusEstoque: 'normal' },
  { sku: 'TAS-S17-001', descricao: 'Dispositivo Tasso S17', categoria: 'dispositivos_coleta', marca: 'Tasso', qtdAtual: 8, qtdMinima: 15, reservada: 5, custoMedio: 72.0, localizacao: 'D1-02', lote: 'L2024-010', statusEstoque: 'alerta' },
  { sku: 'MIT-VAMS-001', descricao: 'Mitra VAMS 30μL', categoria: 'dispositivos_coleta', marca: 'Mitra', qtdAtual: 120, qtdMinima: 30, reservada: 20, custoMedio: 45.0, localizacao: 'D2-01', lote: 'L2024-011', statusEstoque: 'normal' },
  { sku: 'PHX-SPE-001', descricao: 'Cartucho Strata-X 200mg', categoria: 'colunas_spe', marca: 'Phenomenex', qtdAtual: 25, qtdMinima: 10, reservada: 5, custoMedio: 320.0, localizacao: 'A3-01', lote: 'L2024-012', statusEstoque: 'normal' },
  { sku: 'REP-PUR-001', descricao: 'Purificador Rephile Rhii-DI 20L', categoria: 'purificadores_agua', marca: 'Rephile', qtdAtual: 0, qtdMinima: 1, reservada: 0, custoMedio: 28000.0, localizacao: 'E1-01', lote: '-', statusEstoque: 'critico' },
  { sku: 'QTE-COL-001', descricao: 'Coluna QTEK C18 250x4.6mm', categoria: 'colunas_hplc', marca: 'QTEK', qtdAtual: 6, qtdMinima: 3, reservada: 1, custoMedio: 980.0, localizacao: 'A1-07', lote: 'L2024-013', statusEstoque: 'normal' },
  { sku: 'MEL-FRE-001', descricao: 'Freezer Meling -86°C 388L', categoria: 'freezers', marca: 'Meling', qtdAtual: 1, qtdMinima: 1, reservada: 0, custoMedio: 52000.0, localizacao: 'F1-01', lote: 'L2024-014', statusEstoque: 'normal' },
  { sku: 'SCI-CEN-001', descricao: 'Centrífuga Scilogex D2012', categoria: 'centrifugas', marca: 'Scilogex', qtdAtual: 0, qtdMinima: 2, reservada: 0, custoMedio: 8500.0, localizacao: 'F2-01', lote: '-', statusEstoque: 'critico' },
  { sku: 'RES-COL-001', descricao: 'Coluna Restek Rxi-5ms 30m', categoria: 'colunas_gc', marca: 'Restek', qtdAtual: 4, qtdMinima: 3, reservada: 2, custoMedio: 1450.0, localizacao: 'A2-05', lote: 'L2024-015', statusEstoque: 'alerta' },
  { sku: 'SAR-PES-001', descricao: 'Balança Sartorius Secura 225D', categoria: 'equipamentos_cromatografia', marca: 'Sartorius', qtdAtual: 3, qtdMinima: 2, reservada: 1, custoMedio: 18500.0, localizacao: 'C2-01', lote: 'L2024-016', statusEstoque: 'normal' },
];

function getLabelFromConst(list: readonly { value: string; label: string }[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}

function StatusBadge({ status }: { status: ProdutoEstoque['statusEstoque'] }) {
  const config = {
    normal: { label: 'Normal', className: 'bg-green-100 text-green-800 border-green-200' },
    alerta: { label: 'Alerta', className: 'bg-amber-100 text-amber-800 border-amber-200' },
    critico: { label: 'Crítico', className: 'bg-red-100 text-red-800 border-red-200' },
  };
  const c = config[status];
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}

function StockBar({ atual, minima }: { atual: number; minima: number }) {
  const ratio = minima > 0 ? Math.min(atual / (minima * 2), 1) : 1;
  const color = atual <= minima * 0.5 ? 'bg-red-500' : atual <= minima ? 'bg-amber-500' : 'bg-green-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${ratio * 100}%` }} />
      </div>
      <span className="text-sm font-medium">{atual}</span>
    </div>
  );
}

export default function Inventario() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroMarca, setFiltroMarca] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const itensAbaixoMinimo = useMemo(
    () => MOCK_PRODUTOS.filter((p) => p.qtdAtual <= p.qtdMinima).length,
    []
  );

  const produtosFiltrados = useMemo(() => {
    return MOCK_PRODUTOS.filter((p) => {
      const matchBusca =
        p.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        p.sku.toLowerCase().includes(busca.toLowerCase());
      const matchCategoria = filtroCategoria === 'todos' || p.categoria === filtroCategoria;
      const matchMarca = filtroMarca === 'todos' || p.marca.toLowerCase() === filtroMarca;
      const matchStatus = filtroStatus === 'todos' || p.statusEstoque === filtroStatus;
      return matchBusca && matchCategoria && matchMarca && matchStatus;
    });
  }, [busca, filtroCategoria, filtroMarca, filtroStatus]);

  return (
    <div className="space-y-4">
      {itensAbaixoMinimo > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              {itensAbaixoMinimo} itens abaixo do estoque mínimo
            </span>
          </div>
          <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
            Gerar Requisição Automática
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventário</h1>
          <p className="text-muted-foreground">Controle de estoque e inventário de produtos</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por SKU ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas Categorias</SelectItem>
              {CATEGORIAS_PRODUTO.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroMarca} onValueChange={setFiltroMarca}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas Marcas</SelectItem>
              {MARCAS_REPRESENTADAS.map((m) => (
                <SelectItem key={m.value} value={m.label.toLowerCase()}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status Estoque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="alerta">Alerta</SelectItem>
              <SelectItem value="critico">Crítico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Qtd Atual</TableHead>
              <TableHead>Qtd Mínima</TableHead>
              <TableHead>Reservada</TableHead>
              <TableHead>Custo Médio</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtosFiltrados.map((p) => (
              <TableRow
                key={p.sku}
                className={
                  p.statusEstoque === 'critico'
                    ? 'bg-red-50 hover:bg-red-100'
                    : p.statusEstoque === 'alerta'
                    ? 'bg-amber-50 hover:bg-amber-100'
                    : ''
                }
              >
                <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                <TableCell className="font-medium">{p.descricao}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {getLabelFromConst(CATEGORIAS_PRODUTO, p.categoria)}
                  </Badge>
                </TableCell>
                <TableCell>{p.marca}</TableCell>
                <TableCell>
                  <StockBar atual={p.qtdAtual} minima={p.qtdMinima} />
                </TableCell>
                <TableCell>{p.qtdMinima}</TableCell>
                <TableCell>{p.reservada}</TableCell>
                <TableCell>{formatarMoeda(p.custoMedio)}</TableCell>
                <TableCell className="font-mono text-xs">{p.localizacao}</TableCell>
                <TableCell className="font-mono text-xs">{p.lote}</TableCell>
                <TableCell><StatusBadge status={p.statusEstoque} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
