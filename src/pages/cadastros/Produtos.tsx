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
import { CATEGORIAS_PRODUTO, MARCAS_REPRESENTADAS } from '@/lib/constants';

interface Produto {
  id: string;
  sku: string;
  descricao: string;
  categoria: string;
  marca: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  precoCusto: number;
  precoVenda: number;
  status: 'ativo' | 'inativo' | 'descontinuado';
}

const MOCK_PRODUTOS: Produto[] = [
  { id: '1', sku: '00A-4251-E0', descricao: 'Coluna Luna C18 5µm 250x4.6mm', categoria: 'colunas_hplc', marca: 'Phenomenex', estoqueAtual: 12, estoqueMinimo: 5, precoCusto: 1800, precoVenda: 2400, status: 'ativo' },
  { id: '2', sku: '00B-4422-E0', descricao: 'Coluna Kinetex C18 2.6µm 100x4.6mm', categoria: 'colunas_hplc', marca: 'Phenomenex', estoqueAtual: 8, estoqueMinimo: 5, precoCusto: 1900, precoVenda: 2500, status: 'ativo' },
  { id: '3', sku: 'HPLC-AG1260', descricao: 'Sistema HPLC Agilent 1260 Infinity', categoria: 'equipamentos_cromatografia', marca: 'Agilent', estoqueAtual: 2, estoqueMinimo: 1, precoCusto: 285000, precoVenda: 350000, status: 'ativo' },
  { id: '4', sku: 'GIL-P1000', descricao: 'Pipeta P1000 Gilson Pipetman', categoria: 'pipetas', marca: 'Gilson', estoqueAtual: 15, estoqueMinimo: 8, precoCusto: 1200, precoVenda: 1500, status: 'ativo' },
  { id: '5', sku: 'HAM-81101', descricao: 'Seringa Hamilton 100µL', categoria: 'seringas', marca: 'Hamilton', estoqueAtual: 3, estoqueMinimo: 10, precoCusto: 480, precoVenda: 600, status: 'ativo' },
  { id: '6', sku: 'RAY-RT6', descricao: 'Dissolutor Raytor RT6', categoria: 'dissolutores', marca: 'Raytor', estoqueAtual: 4, estoqueMinimo: 2, precoCusto: 15000, precoVenda: 20000, status: 'ativo' },
  { id: '7', sku: 'REP-RZ100', descricao: 'Purificador de Água Rephile Roz 100', categoria: 'purificadores_agua', marca: 'Rephile', estoqueAtual: 1, estoqueMinimo: 2, precoCusto: 4000, precoVenda: 5000, status: 'ativo' },
  { id: '8', sku: 'SCI-D2012', descricao: 'Centrífuga Scilogex D2012 Plus', categoria: 'centrifugas', marca: 'Scilogex', estoqueAtual: 6, estoqueMinimo: 3, precoCusto: 6800, precoVenda: 8000, status: 'ativo' },
  { id: '9', sku: 'MEL-HL388', descricao: 'Freezer -86°C Meling DW-HL388', categoria: 'freezers', marca: 'Meling', estoqueAtual: 2, estoqueMinimo: 1, precoCusto: 11000, precoVenda: 13000, status: 'ativo' },
  { id: '10', sku: 'TAS-M20', descricao: 'Dispositivo de Coleta Tasso M20', categoria: 'dispositivos_coleta', marca: 'Tasso', estoqueAtual: 25, estoqueMinimo: 10, precoCusto: 320, precoVenda: 400, status: 'ativo' },
  { id: '11', sku: 'CAM-TLC4', descricao: 'Espectrômetro CAMAG TLC Scanner 4', categoria: 'espectrometros', marca: 'CAMAG', estoqueAtual: 1, estoqueMinimo: 1, precoCusto: 180000, precoVenda: 200000, status: 'ativo' },
  { id: '12', sku: 'RES-ZB5', descricao: 'Coluna Zebron ZB-5 30m 0.25mm', categoria: 'colunas_gc', marca: 'Restek', estoqueAtual: 0, estoqueMinimo: 5, precoCusto: 850, precoVenda: 1100, status: 'ativo' },
  { id: '13', sku: 'PHN-SPE', descricao: 'Strata-X SPE 33µm 200mg', categoria: 'colunas_spe', marca: 'Phenomenex', estoqueAtual: 2, estoqueMinimo: 8, precoCusto: 45, precoVenda: 60, status: 'ativo' },
  { id: '14', sku: 'MIT-VAMS', descricao: 'Mitra Microsampler VAMS', categoria: 'dispositivos_coleta', marca: 'Mitra', estoqueAtual: 18, estoqueMinimo: 5, precoCusto: 250, precoVenda: 320, status: 'ativo' },
  { id: '15', sku: 'QTK-MAESTRO', descricao: 'GC/MS Quadrupolo MAESTRO-αMS', categoria: 'equipamentos_cromatografia', marca: 'QTEK', estoqueAtual: 1, estoqueMinimo: 1, precoCusto: 450000, precoVenda: 520000, status: 'ativo' },
];

const ESTOQUE_STATUS_CONFIG = {
  critico: { label: 'Crítico', className: 'bg-red-100 text-red-800 border-red-200' },
  alerta: { label: 'Alerta', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  normal: { label: 'Normal', className: 'bg-green-100 text-green-800 border-green-200' },
};

const PRODUTO_STATUS_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  inativo: { label: 'Inativo', className: 'bg-red-100 text-red-800 border-red-200' },
  descontinuado: { label: 'Descontinuado', className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

export default function Produtos() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroMarca, setFiltroMarca] = useState('todos');
  const [filtroEstoque, setFiltroEstoque] = useState('todos');

  const produtosFiltrados = useMemo(() => {
    return MOCK_PRODUTOS.filter((p) => {
      const matchBusca =
        p.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        p.sku.toLowerCase().includes(busca.toLowerCase());
      const matchCategoria = filtroCategoria === 'todos' || p.categoria === filtroCategoria;
      const matchMarca = filtroMarca === 'todos' || p.marca.toLowerCase() === filtroMarca;
      const matchEstoque =
        filtroEstoque === 'todos' ||
        (filtroEstoque === 'critico' && p.estoqueAtual === 0) ||
        (filtroEstoque === 'alerta' && p.estoqueAtual > 0 && p.estoqueAtual < p.estoqueMinimo) ||
        (filtroEstoque === 'normal' && p.estoqueAtual >= p.estoqueMinimo);
      return matchBusca && matchCategoria && matchMarca && matchEstoque;
    });
  }, [busca, filtroCategoria, filtroMarca, filtroEstoque]);

  const getCategoriaLabel = (value: string) => {
    const found = CATEGORIAS_PRODUTO.find((c) => c.value === value);
    return found ? found.label : value;
  };

  const getEstoqueStatus = (p: Produto) => {
    if (p.estoqueAtual === 0) return 'critico';
    if (p.estoqueAtual < p.estoqueMinimo) return 'alerta';
    return 'normal';
  };

  const getRowClassName = (p: Produto) => {
    if (p.estoqueAtual === 0) return 'bg-red-50/50';
    if (p.estoqueAtual < p.estoqueMinimo) return 'bg-amber-50/50';
    return undefined;
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
        <p className="text-muted-foreground">Catálogo de produtos e controle de estoque</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por descrição ou SKU..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas</SelectItem>
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
              <SelectItem value="todos">Todas</SelectItem>
              {MARCAS_REPRESENTADAS.map((m) => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroEstoque} onValueChange={setFiltroEstoque}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Estoque" />
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
              <TableHead>Estoque</TableHead>
              <TableHead>Preço Venda</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtosFiltrados.map((p) => {
              const estoqueStatus = getEstoqueStatus(p);
              return (
                <TableRow key={p.id} className={getRowClassName(p)}>
                  <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                  <TableCell className="font-medium">{p.descricao}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      {getCategoriaLabel(p.categoria)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.marca}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{p.estoqueAtual}/{p.estoqueMinimo}</span>
                      <Badge variant="outline" className={ESTOQUE_STATUS_CONFIG[estoqueStatus].className}>
                        {ESTOQUE_STATUS_CONFIG[estoqueStatus].label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatarMoeda(p.precoVenda)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={PRODUTO_STATUS_CONFIG[p.status].className}>
                      {PRODUTO_STATUS_CONFIG[p.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}