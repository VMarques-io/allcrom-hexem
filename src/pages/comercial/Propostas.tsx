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

interface Proposta {
  id: string;
  numero: string;
  cliente: string;
  valorTotal: number;
  status: 'rascunho' | 'enviada' | 'em_negociacao' | 'aceita' | 'rejeitada' | 'expirada';
  dataEnvio: string;
  validade: string;
  vendedor: string;
}

const MOCK_PROPOSTAS: Proposta[] = [
  { id: '1', numero: 'PROP-2024-001', cliente: 'BioGen Biotecnologia', valorTotal: 350000, status: 'enviada', dataEnvio: '2024-03-10', validade: '2024-03-24', vendedor: 'Carlos' },
  { id: '2', numero: 'PROP-2024-002', cliente: 'Farmacêutica Magnum', valorTotal: 45200, status: 'aceita', dataEnvio: '2024-03-08', validade: '2024-03-22', vendedor: 'Ana' },
  { id: '3', numero: 'PROP-2024-003', cliente: 'LabCrom Análises', valorTotal: 156000, status: 'em_negociacao', dataEnvio: '2024-03-12', validade: '2024-03-26', vendedor: 'João' },
  { id: '4', numero: 'PROP-2024-004', cliente: 'Alimentos Bom Sabor', valorTotal: 12800, status: 'rascunho', dataEnvio: '2024-03-14', validade: '2024-03-28', vendedor: 'Carlos' },
  { id: '5', numero: 'PROP-2024-005', cliente: 'Hospitais Unidos', valorTotal: 234000, status: 'rejeitada', dataEnvio: '2024-03-05', validade: '2024-03-19', vendedor: 'João' },
  { id: '6', numero: 'PROP-2024-006', cliente: 'Cromatografia & Cia', valorTotal: 5200, status: 'expirada', dataEnvio: '2024-02-28', validade: '2024-03-14', vendedor: 'Carlos' },
];

const STATUS_PROPOSTA_CONFIG: Record<string, { label: string; className: string }> = {
  rascunho: { label: 'Rascunho', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  enviada: { label: 'Enviada', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  em_negociacao: { label: 'Em Negociação', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  aceita: { label: 'Aceita', className: 'bg-green-100 text-green-800 border-green-200' },
  rejeitada: { label: 'Rejeitada', className: 'bg-red-100 text-red-800 border-red-200' },
  expirada: { label: 'Expirada', className: 'bg-amber-100 text-amber-800 border-amber-200' },
};

export default function Propostas() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [propostaSelecionada, setPropostaSelecionada] = useState<Proposta | null>(null);

  const propostasFiltradas = useMemo(() => {
    return MOCK_PROPOSTAS.filter((p) => {
      const matchBusca =
        p.numero.toLowerCase().includes(busca.toLowerCase()) ||
        p.cliente.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || p.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Propostas</h1>
          <p className="text-muted-foreground">Gestão de propostas comerciais</p>
        </div>
        <Button onClick={() => toast.info('Funcionalidade em desenvolvimento')}>
          <Plus className="h-4 w-4" />
          Nova Proposta
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar proposta ou cliente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="enviada">Enviada</SelectItem>
              <SelectItem value="em_negociacao">Em Negociação</SelectItem>
              <SelectItem value="aceita">Aceita</SelectItem>
              <SelectItem value="rejeitada">Rejeitada</SelectItem>
              <SelectItem value="expirada">Expirada</SelectItem>
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
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Envio</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propostasFiltradas.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs font-medium">{p.numero}</TableCell>
                <TableCell className="font-medium">{p.cliente}</TableCell>
                <TableCell className="font-medium">{formatarMoeda(p.valorTotal)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_PROPOSTA_CONFIG[p.status]?.className}>
                    {STATUS_PROPOSTA_CONFIG[p.status]?.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatarData(p.dataEnvio)}</TableCell>
                <TableCell className="text-muted-foreground">{formatarData(p.validade)}</TableCell>
                <TableCell className="text-muted-foreground">{p.vendedor}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => setPropostaSelecionada(p)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!propostaSelecionada} onOpenChange={(open) => !open && setPropostaSelecionada(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{propostaSelecionada?.numero}</SheetTitle>
            <SheetDescription>{propostaSelecionada?.cliente}</SheetDescription>
          </SheetHeader>

          {propostaSelecionada && (
            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Informações</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Cliente:</span> {propostaSelecionada.cliente}</div>
                  <div><span className="text-muted-foreground">Vendedor:</span> {propostaSelecionada.vendedor}</div>
                  <div><span className="text-muted-foreground">Valor Total:</span> <span className="font-medium">{formatarMoeda(propostaSelecionada.valorTotal)}</span></div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={STATUS_PROPOSTA_CONFIG[propostaSelecionada.status]?.className}>{STATUS_PROPOSTA_CONFIG[propostaSelecionada.status]?.label}</Badge></div>
                  <div><span className="text-muted-foreground">Data Envio:</span> {formatarData(propostaSelecionada.dataEnvio)}</div>
                  <div><span className="text-muted-foreground">Validade:</span> {formatarData(propostaSelecionada.validade)}</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Condições Comerciais</h3>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Pagamento:</span> 30/60/90 dias</p>
                  <p><span className="text-muted-foreground">Frete:</span> CIF</p>
                  <p><span className="text-muted-foreground">Garantia:</span> 12 meses</p>
                  <p><span className="text-muted-foreground">Instalação:</span> Inclusa</p>
                  <p><span className="text-muted-foreground">Treinamento:</span> Incluso (8h)</p>
                </div>
              </div>

              <Separator />

              <Button className="w-full" variant="outline" onClick={() => toast.info('Assinatura digital em desenvolvimento')}>
                Assinatura Digital
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}