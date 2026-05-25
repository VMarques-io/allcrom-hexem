import { useState, useMemo } from 'react';
import { Search, AlertTriangle, Shield, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatarData } from '@/lib/formatters';

interface RegistroANVISA {
  id: string;
  produto: string;
  fabricante: string;
  registroANVISA: string;
  statusRegistro: 'ativo' | 'em_renovacao' | 'em_analise' | 'vencido';
  validadeRegistro: string;
  categoria: string;
  dataRenovacao?: string;
  diasParaVencer?: number;
}

const MOCK_REGISTROS: RegistroANVISA[] = [
  { id: '1', produto: 'Tasso M20', fabricante: 'Tasso Inc.', registroANVISA: 'MS/8058.4310001', statusRegistro: 'ativo', validadeRegistro: '2026-08-15', categoria: 'Dispositivo de Coleta', diasParaVencer: 873 },
  { id: '2', produto: 'Tasso S17', fabricante: 'Tasso Inc.', registroANVISA: 'MS/8058.4310002', statusRegistro: 'ativo', validadeRegistro: '2026-08-15', categoria: 'Dispositivo de Coleta', diasParaVencer: 873 },
  { id: '3', produto: 'Mitra VAMS 30μL', fabricante: 'Neoteryx LLC', registroANVISA: 'MS/8146.8930001', statusRegistro: 'ativo', validadeRegistro: '2025-12-01', categoria: 'Dispositivo de Coleta', diasParaVencer: 616 },
  { id: '4', produto: 'Harpera Microbiópsia', fabricante: 'Hologic Inc.', registroANVISA: 'MS/8097.6540001', statusRegistro: 'em_renovacao', validadeRegistro: '2024-06-30', categoria: 'Microbiópsia', diasParaVencer: 97 },
  { id: '5', produto: 'Kit Diagnóstico Rápido', fabricante: 'MedClub', registroANVISA: 'MS/8023.4150001', statusRegistro: 'em_analise', validadeRegistro: '-', categoria: 'Kit Diagnóstico' },
  { id: '6', produto: 'Mitra Microsampling Kit', fabricante: 'Neoteryx LLC', registroANVISA: 'MS/8146.8930003', statusRegistro: 'em_renovacao', validadeRegistro: '2024-09-15', categoria: 'Kit Diagnóstico', diasParaVencer: 174 },
];

const STATUS_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  em_renovacao: { label: 'Em Renovação', className: 'bg-amber-100 text-amber-800 border-amber-200', icon: RefreshCw },
  em_analise: { label: 'Em Análise', className: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
  vencido: { label: 'Vencido', className: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle },
};

export default function RegistroANVISA() {
  const [busca, setBusca] = useState('');

  const registrosFiltrados = useMemo(() => {
    return MOCK_REGISTROS.filter(
      (r) =>
        r.produto.toLowerCase().includes(busca.toLowerCase()) ||
        r.fabricante.toLowerCase().includes(busca.toLowerCase()) ||
        r.registroANVISA.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca]);

  const alertas = MOCK_REGISTROS.filter(
    (r) => r.statusRegistro === 'em_renovacao' || (r.diasParaVencer !== undefined && r.diasParaVencer < 120)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
          <Shield className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registro ANVISA</h1>
          <p className="text-muted-foreground">Dashboard de status dos registros ANVISA</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{MOCK_REGISTROS.filter((r) => r.statusRegistro === 'ativo').length}</p>
              <p className="text-xs text-muted-foreground">Ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <RefreshCw className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{MOCK_REGISTROS.filter((r) => r.statusRegistro === 'em_renovacao').length}</p>
              <p className="text-xs text-muted-foreground">Em Renovação</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{MOCK_REGISTROS.filter((r) => r.statusRegistro === 'em_analise').length}</p>
              <p className="text-xs text-muted-foreground">Em Análise</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{alertas.length}</p>
              <p className="text-xs text-muted-foreground">Alertas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {alertas.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">Alertas de Renovação</span>
          </div>
          <ul className="space-y-1">
            {alertas.map((a) => (
              <li key={a.id} className="text-sm text-amber-700">
                <strong>{a.produto}</strong> - {a.diasParaVencer !== undefined ? `${a.diasParaVencer} dias para vencer` : 'Renovação em andamento'}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar produto ou registro..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Fabricante</TableHead>
              <TableHead>Registro ANVISA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Prazo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrosFiltrados.map((r) => (
              <TableRow
                key={r.id}
                className={
                  r.statusRegistro === 'em_renovacao'
                    ? 'bg-amber-50 hover:bg-amber-100'
                    : r.statusRegistro === 'vencido'
                    ? 'bg-red-50 hover:bg-red-100'
                    : ''
                }
              >
                <TableCell className="font-medium">{r.produto}</TableCell>
                <TableCell>{r.fabricante}</TableCell>
                <TableCell className="font-mono text-xs">{r.registroANVISA}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[r.statusRegistro].className}>
                    {STATUS_CONFIG[r.statusRegistro].label}
                  </Badge>
                </TableCell>
                <TableCell>{r.validadeRegistro === '-' ? '-' : formatarData(r.validadeRegistro)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">{r.categoria}</Badge>
                </TableCell>
                <TableCell>
                  {r.diasParaVencer !== undefined ? (
                    <span className={r.diasParaVencer < 120 ? 'text-amber-700 font-medium' : 'text-muted-foreground'}>
                      {r.diasParaVencer} dias
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
