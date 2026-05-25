import { useState, useMemo } from 'react';
import { Search, Heart, Shield } from 'lucide-react';
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
import { formatarData } from '@/lib/formatters';

interface ProdutoSaude {
  id: string;
  produto: string;
  fabricante: string;
  registroANVISA: string;
  statusRegistro: 'ativo' | 'em_renovacao' | 'em_analise';
  validadeRegistro: string;
  categoria: string;
  estoque: number;
}

const MOCK_PRODUTOS_SAUDE: ProdutoSaude[] = [
  { id: '1', produto: 'Tasso M20', fabricante: 'Tasso Inc.', registroANVISA: '80584310001', statusRegistro: 'ativo', validadeRegistro: '2026-08-15', categoria: 'dispositivo_coleta', estoque: 50 },
  { id: '2', produto: 'Tasso S17', fabricante: 'Tasso Inc.', registroANVISA: '80584310002', statusRegistro: 'ativo', validadeRegistro: '2026-08-15', categoria: 'dispositivo_coleta', estoque: 8 },
  { id: '3', produto: 'Mitra VAMS 30μL', fabricante: 'Neoteryx LLC', registroANVISA: '81468930001', statusRegistro: 'ativo', validadeRegistro: '2025-12-01', categoria: 'dispositivo_coleta', estoque: 120 },
  { id: '4', produto: 'Harpera Microbiópsia', fabricante: 'Hologic Inc.', registroANVISA: '80976540001', statusRegistro: 'em_renovacao', validadeRegistro: '2024-06-30', categoria: 'microbiopsia', estoque: 25 },
  { id: '5', produto: 'Mitra VAMS 10μL', fabricante: 'Neoteryx LLC', registroANVISA: '81468930002', statusRegistro: 'ativo', validadeRegistro: '2025-12-01', categoria: 'dispositivo_coleta', estoque: 80 },
  { id: '6', produto: 'Kit Diagnóstico Rápido', fabricante: 'MedClub', registroANVISA: '80234150001', statusRegistro: 'em_analise', validadeRegistro: '-', categoria: 'kit_diagnostico', estoque: 0 },
  { id: '7', produto: 'Tasso M20 Plus', fabricante: 'Tasso Inc.', registroANVISA: '80584310003', statusRegistro: 'em_analise', validadeRegistro: '-', categoria: 'dispositivo_coleta', estoque: 0 },
  { id: '8', produto: 'Harpera Biópsia Endometrial', fabricante: 'Hologic Inc.', registroANVISA: '80976540002', statusRegistro: 'ativo', validadeRegistro: '2026-03-20', categoria: 'microbiopsia', estoque: 15 },
  { id: '9', produto: 'Mitra Microsampling Kit', fabricante: 'Neoteryx LLC', registroANVISA: '81468930003', statusRegistro: 'em_renovacao', validadeRegistro: '2024-09-15', categoria: 'kit_diagnostico', estoque: 30 },
  { id: '10', produto: 'Tasso SST', fabricante: 'Tasso Inc.', registroANVISA: '80584310004', statusRegistro: 'ativo', validadeRegistro: '2027-01-10', categoria: 'dispositivo_coleta', estoque: 40 },
];

const STATUS_REGISTRO_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  em_renovacao: { label: 'Em Renovação', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  em_analise: { label: 'Em Análise', className: 'bg-blue-100 text-blue-800 border-blue-200' },
};

const CATEGORIA_LABELS: Record<string, string> = {
  dispositivo_coleta: 'Dispositivo de Coleta',
  microbiopsia: 'Microbiópsia',
  kit_diagnostico: 'Kit Diagnóstico',
};

function formatarRegistroANVISA(reg: string) {
  return `MS/${reg.slice(0, 4)}.${reg.slice(4)}`;
}

export default function ProdutosSaude() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const produtosFiltrados = useMemo(() => {
    return MOCK_PRODUTOS_SAUDE.filter((p) => {
      const matchBusca =
        p.produto.toLowerCase().includes(busca.toLowerCase()) ||
        p.fabricante.toLowerCase().includes(busca.toLowerCase()) ||
        p.registroANVISA.includes(busca);
      const matchStatus = filtroStatus === 'todos' || p.statusRegistro === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Produtos Saúde</h1>
              <Badge className="bg-emerald-600 hover:bg-emerald-700">
                <Heart className="h-3 w-3 mr-1" />
                Allcrom Saúde
              </Badge>
            </div>
            <p className="text-muted-foreground">Produtos com registro ANVISA para área da saúde</p>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar produto, fabricante ou registro..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status ANVISA" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="em_renovacao">Em Renovação</SelectItem>
              <SelectItem value="em_analise">Em Análise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Fabricante</TableHead>
              <TableHead>Registro ANVISA</TableHead>
              <TableHead>Status Registro</TableHead>
              <TableHead>Validade Registro</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Estoque</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtosFiltrados.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.produto}</TableCell>
                <TableCell>{p.fabricante}</TableCell>
                <TableCell className="font-mono text-xs">{formatarRegistroANVISA(p.registroANVISA)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_REGISTRO_CONFIG[p.statusRegistro].className}>
                    {STATUS_REGISTRO_CONFIG[p.statusRegistro].label}
                  </Badge>
                </TableCell>
                <TableCell>{p.validadeRegistro === '-' ? '-' : formatarData(p.validadeRegistro)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {CATEGORIA_LABELS[p.categoria] ?? p.categoria}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={p.estoque === 0 ? 'text-red-600 font-medium' : ''}>
                    {p.estoque}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
