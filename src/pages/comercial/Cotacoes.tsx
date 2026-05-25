import { useState, useMemo } from 'react';
import { Search, Plus, Eye } from 'lucide-react';
import { toast } from 'sonner';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { formatarData, formatarMoeda } from '@/lib/formatters';
import { STATUS_COTACAO } from '@/lib/constants';

interface ItemCotacao {
  sku: string;
  descricao: string;
  qtd: number;
  precoUnitario: number;
  desconto: number;
  subtotal: number;
}

interface Cotacao {
  id: string;
  numero: string;
  cliente: string;
  itens: number;
  valorTotal: number;
  status: string;
  dataCriacao: string;
  validade: string;
  vendedor: string;
  segmento: string;
}

const MOCK_ITENS: Record<string, ItemCotacao[]> = {
  '1': [
    { sku: 'HPLC-LUNA-C18', descricao: 'Coluna Luna C18 150x4.6mm', qtd: 10, precoUnitario: 18500, desconto: 5, subtotal: 175750 },
    { sku: 'HPLC-KINEX-C18', descricao: 'Coluna Kinetex C18 100x4.6mm', qtd: 5, precoUnitario: 22000, desconto: 3, subtotal: 106700 },
    { sku: 'SPE-STRATA-X', descricao: 'Cartucho Strata-X 33μm', qtd: 50, precoUnitario: 180, desconto: 0, subtotal: 9000 },
    { sku: 'SERINGA-HAM-100', descricao: 'Seringa Hamilton 100μL', qtd: 8, precoUnitario: 320, desconto: 0, subtotal: 2560 },
  ],
  '2': [
    { sku: 'DISSOLUTOR-RT600', descricao: 'Dissolutor Raytor RT-600', qtd: 1, precoUnitario: 38000, desconto: 5, subtotal: 36100 },
    { sku: 'CESTO-PA-50ML', descricao: 'Cesto Pás 50mL', qtd: 6, precoUnitario: 850, desconto: 0, subtotal: 5100 },
    { sku: 'CESTO-APARATO-1', descricao: 'Cesto Aparato 1', qtd: 6, precoUnitario: 670, desconto: 0, subtotal: 4020 },
  ],
  '3': [
    { sku: 'GC-COLUNA-RXI', descricao: 'Coluna GC Rxi-5ms 30m', qtd: 3, precoUnitario: 4500, desconto: 0, subtotal: 13500 },
    { sku: 'HPLC-LUNA-SEC', descricao: 'Coluna Luna SEC 300x7.8mm', qtd: 2, precoUnitario: 28000, desconto: 2, subtotal: 54880 },
    { sku: 'PIPETA-GIL-P200', descricao: 'Pipeta Gilson P200', qtd: 4, precoUnitario: 2800, desconto: 0, subtotal: 11200 },
    { sku: 'SERINGA-HAM-500', descricao: 'Seringa Hamilton 500μL', qtd: 12, precoUnitario: 450, desconto: 0, subtotal: 5400 },
    { sku: 'PURIF-REECH-30L', descricao: 'Purificador Rephile ECH 30L', qtd: 1, precoUnitario: 75000, desconto: 10, subtotal: 67500 },
  ],
  '4': [
    { sku: 'COL-SPE-C18-500', descricao: 'Coluna SPE C18 500mg', qtd: 20, precoUnitario: 320, desconto: 0, subtotal: 6400 },
    { sku: 'FILTRO-PTFE-045', descricao: 'Filtro PTFE 0.45μm', qtd: 10, precoUnitario: 180, desconto: 0, subtotal: 1800 },
  ],
  '5': [
    { sku: 'TASSO-M20-KIT', descricao: 'Kit Tasso M20', qtd: 5, precoUnitario: 12000, desconto: 5, subtotal: 57000 },
    { sku: 'TASSO-S17-KIT', descricao: 'Kit Tasso S17', qtd: 4, precoUnitario: 8500, desconto: 3, subtotal: 32980 },
  ],
  '6': [
    { sku: 'HPLC-1260-INF', descricao: 'HPLC Agilent 1260 Infinity', qtd: 1, precoUnitario: 180000, desconto: 8, subtotal: 165600 },
    { sku: 'COLUNA-LUNA-SET', descricao: 'Kit Colunas Luna', qtd: 10, precoUnitario: 2200, desconto: 5, subtotal: 20900 },
    { sku: 'PURIF-REECH-10L', descricao: 'Purificador Rephile ECH 10L', qtd: 1, precoUnitario: 32000, desconto: 0, subtotal: 32000 },
    { sku: 'SERINGA-HAM-SET', descricao: 'Kit Seringas Hamilton', qtd: 3, precoUnitario: 1200, desconto: 0, subtotal: 3600 },
    { sku: 'FILTRO-NYLON-SET', descricao: 'Kit Filtros Nylon', qtd: 5, precoUnitario: 900, desconto: 0, subtotal: 4500 },
    { sku: 'PIPETAS-GIL-SET', descricao: 'Kit Pipetas Gilson', qtd: 2, precoUnitario: 4500, desconto: 0, subtotal: 9000 },
  ],
  '7': [
    { sku: 'CAMAG-SCANNER', descricao: 'Scanner CAMAG TLC', qtd: 1, precoUnitario: 5200, desconto: 0, subtotal: 5200 },
  ],
  '8': [
    { sku: 'GC-MS-QTEK', descricao: 'GC/MS QTEK', qtd: 1, precoUnitario: 320000, desconto: 5, subtotal: 304000 },
    { sku: 'COLUNA-RESTEK-SET', descricao: 'Kit Colunas Restek', qtd: 5, precoUnitario: 3500, desconto: 10, subtotal: 15750 },
    { sku: 'DISSOLUTOR-SET', descricao: 'Acessórios Dissolutor', qtd: 2, precoUnitario: 8500, desconto: 0, subtotal: 17000 },
    { sku: 'PURIF-REECH-60L', descricao: 'Purificador Rephile ECH 60L', qtd: 1, precoUnitario: 85000, desconto: 5, subtotal: 80750 },
    { sku: 'PIPETAS-GIL-CAL', descricao: 'Pipetas Gilson Calibradas', qtd: 4, precoUnitario: 3000, desconto: 0, subtotal: 12000 },
  ],
};

const MOCK_COTACOES: Cotacao[] = [
  { id: '1', numero: 'COT-2024-001', cliente: 'BioGen Biotecnologia', itens: 5, valorTotal: 284500, status: 'enviada', dataCriacao: '2024-03-10', validade: '2024-03-24', vendedor: 'Carlos', segmento: 'biotecnologia' },
  { id: '2', numero: 'COT-2024-002', cliente: 'Farmacêutica Magnum', itens: 3, valorTotal: 45200, status: 'aprovada', dataCriacao: '2024-03-08', validade: '2024-03-22', vendedor: 'Ana', segmento: 'cromatografia' },
  { id: '3', numero: 'COT-2024-003', cliente: 'LabCrom Análises', itens: 8, valorTotal: 156000, status: 'em_analise', dataCriacao: '2024-03-12', validade: '2024-03-26', vendedor: 'João', segmento: 'cromatografia' },
  { id: '4', numero: 'COT-2024-004', cliente: 'Alimentos Bom Sabor', itens: 2, valorTotal: 12800, status: 'rascunho', dataCriacao: '2024-03-14', validade: '2024-03-28', vendedor: 'Carlos', segmento: 'cromatografia' },
  { id: '5', numero: 'COT-2024-005', cliente: 'Instituto Biomédico', itens: 4, valorTotal: 89000, status: 'enviada', dataCriacao: '2024-03-11', validade: '2024-03-25', vendedor: 'Ana', segmento: 'biotecnologia' },
  { id: '6', numero: 'COT-2024-006', cliente: 'Hospitais Unidos', itens: 6, valorTotal: 234000, status: 'rejeitada', dataCriacao: '2024-03-05', validade: '2024-03-19', vendedor: 'João', segmento: 'saude' },
  { id: '7', numero: 'COT-2024-007', cliente: 'Cromatografia & Cia', itens: 1, valorTotal: 5200, status: 'expirada', dataCriacao: '2024-02-28', validade: '2024-03-14', vendedor: 'Carlos', segmento: 'cromatografia' },
  { id: '8', numero: 'COT-2024-008', cliente: 'Universidade Federal', itens: 10, valorTotal: 412000, status: 'em_analise', dataCriacao: '2024-03-13', validade: '2024-03-27', vendedor: 'Ana', segmento: 'cromatografia' },
];

const STATUS_COTACAO_CONFIG: Record<string, { label: string; className: string }> = {
  rascunho: { label: 'Rascunho', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  enviada: { label: 'Enviada', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_analise: { label: 'Em Análise', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  aprovada: { label: 'Aprovada', className: 'bg-green-100 text-green-800 border-green-200' },
  rejeitada: { label: 'Rejeitada', className: 'bg-red-100 text-red-800 border-red-200' },
  expirada: { label: 'Expirada', className: 'bg-amber-100 text-amber-800 border-amber-200' },
};

export default function Cotacoes() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [cotacaoSelecionada, setCotacaoSelecionada] = useState<Cotacao | null>(null);

  const cotacoesFiltradas = useMemo(() => {
    return MOCK_COTACOES.filter((c) => {
      const matchBusca =
        c.numero.toLowerCase().includes(busca.toLowerCase()) ||
        c.cliente.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cotações</h1>
          <p className="text-muted-foreground">Gestão de cotações comerciais</p>
        </div>
        <Button onClick={() => toast.info('Funcionalidade em desenvolvimento')}>
          <Plus className="h-4 w-4" />
          Nova Cotação
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar cotação ou cliente..."
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
              {STATUS_COTACAO.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-center">Itens</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cotacoesFiltradas.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs font-medium">{c.numero}</TableCell>
                <TableCell className="font-medium">{c.cliente}</TableCell>
                <TableCell className="text-center">{c.itens}</TableCell>
                <TableCell className="font-medium">{formatarMoeda(c.valorTotal)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_COTACAO_CONFIG[c.status]?.className}>
                    {STATUS_COTACAO_CONFIG[c.status]?.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatarData(c.dataCriacao)}</TableCell>
                <TableCell className="text-muted-foreground">{formatarData(c.validade)}</TableCell>
                <TableCell className="text-muted-foreground">{c.vendedor}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => setCotacaoSelecionada(c)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!cotacaoSelecionada} onOpenChange={(open) => !open && setCotacaoSelecionada(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{cotacaoSelecionada?.numero}</SheetTitle>
            <SheetDescription>{cotacaoSelecionada?.cliente}</SheetDescription>
          </SheetHeader>

          {cotacaoSelecionada && (
            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Informações do Cliente</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Cliente:</span> {cotacaoSelecionada.cliente}</div>
                  <div><span className="text-muted-foreground">Segmento:</span> {cotacaoSelecionada.segmento}</div>
                  <div><span className="text-muted-foreground">Vendedor:</span> {cotacaoSelecionada.vendedor}</div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={STATUS_COTACAO_CONFIG[cotacaoSelecionada.status]?.className}>{STATUS_COTACAO_CONFIG[cotacaoSelecionada.status]?.label}</Badge></div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Itens da Cotação</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-center">Qtd</TableHead>
                        <TableHead>Unitário</TableHead>
                        <TableHead className="text-center">Desc%</TableHead>
                        <TableHead>Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(MOCK_ITENS[cotacaoSelecionada.id] || []).map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                          <TableCell className="text-sm">{item.descricao}</TableCell>
                          <TableCell className="text-center">{item.qtd}</TableCell>
                          <TableCell>{formatarMoeda(item.precoUnitario)}</TableCell>
                          <TableCell className="text-center">{item.desconto}%</TableCell>
                          <TableCell className="font-medium">{formatarMoeda(item.subtotal)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Condições</h3>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Pagamento:</span> 30/60/90 dias</p>
                  <p><span className="text-muted-foreground">Frete:</span> CIF</p>
                  <p><span className="text-muted-foreground">Validade:</span> 15 dias</p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}