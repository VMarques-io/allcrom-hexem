import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';
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

interface Validacao {
  id: string;
  numero: string;
  cliente: string;
  equipamento: string;
  protocolo: string;
  status: 'em_andamento' | 'aprovada' | 'reprovada';
  data: string;
  validador: string;
}

const MOCK_VALIDACOES: Validacao[] = [
  { id: '1', numero: 'VAL-001', cliente: 'Farmacêutica XYZ', equipamento: 'GC Shimadzu 2030', protocolo: 'IQ/OQ/PQ-001', status: 'aprovada', data: '2024-03-15', validador: 'Carlos Lima' },
  { id: '2', numero: 'VAL-002', cliente: 'Petroquímica ABC', equipamento: 'GC Agilent 7890B', protocolo: 'IQ/OQ-002', status: 'em_andamento', data: '2024-03-13', validador: 'Pedro Santos' },
  { id: '3', numero: 'VAL-003', cliente: 'Hospital São Paulo', equipamento: 'Dissolutor Raytor RT-600',   protocolo: 'IQ-003', status: 'em_andamento', data: '2024-03-14', validador: 'Ana Costa' },
  { id: '4', numero: 'VAL-004', cliente: 'Laboratório ABC', equipamento: 'HPLC Agilent 1260', protocolo: 'OQ-004', status: 'reprovada', data: '2024-03-10', validador: 'Carlos Lima' },
  { id: '5', numero: 'VAL-005', cliente: 'Universidade Federal', equipamento: 'HPLC Waters e2695', protocolo: 'PQ-005', status: 'aprovada', data: '2024-03-08', validador: 'Pedro Santos' },
];

const STATUS_CONFIG = {
  em_andamento: { label: 'Em Andamento', className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  aprovada: { label: 'Aprovada', className: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  reprovada: { label: 'Reprovada', className: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
};

export default function Validacoes() {
  const [busca, setBusca] = useState('');

  const validacoesFiltradas = MOCK_VALIDACOES.filter(
    (v) =>
      v.numero.toLowerCase().includes(busca.toLowerCase()) ||
      v.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      v.equipamento.toLowerCase().includes(busca.toLowerCase()) ||
      v.protocolo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Validações</h1>
        <p className="text-muted-foreground">Registros de qualificação e validação de equipamentos</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar validação, cliente ou protocolo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Validação</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Protocolo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Validador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validacoesFiltradas.map((v) => {
              const config = STATUS_CONFIG[v.status];
              return (
                <TableRow key={v.id}>
                  <TableCell className="font-mono text-xs font-medium">{v.numero}</TableCell>
                  <TableCell className="font-medium">{v.cliente}</TableCell>
                  <TableCell>{v.equipamento}</TableCell>
                  <TableCell className="font-mono text-xs">{v.protocolo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={config.className}>
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatarData(v.data)}</TableCell>
                  <TableCell>{v.validador}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
