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

interface HistoricoIntervencao {
  id: string;
  numeroOS: string;
  equipamento: string;
  cliente: string;
  tipoIntervencao: string;
  data: string;
  tecnico: string;
  resultado: 'concluido' | 'parcial' | 'nao_resolvido';
}

const MOCK_HISTORICO: HistoricoIntervencao[] = [
  { id: '1', numeroOS: 'OS-0040', equipamento: 'HPLC Agilent 1260', cliente: 'Laboratório ABC', tipoIntervencao: 'Manutenção Corretiva', data: '2024-03-01', tecnico: 'Carlos Lima', resultado: 'concluido' },
  { id: '2', numeroOS: 'OS-0041', equipamento: 'GC Shimadzu 2030', cliente: 'Farmacêutica XYZ', tipoIntervencao: 'Calibração', data: '2024-03-02', tecnico: 'Pedro Santos', resultado: 'concluido' },
  { id: '3', numeroOS: 'OS-0042', equipamento: 'Dissolutor Raytor RT-600', cliente: 'Hospital São Paulo', tipoIntervencao: 'Instalação', data: '2024-03-03', tecnico: 'Ana Costa', resultado: 'parcial' },
  { id: '4', numeroOS: 'OS-0043', equipamento: 'Pipeta Gilson P1000', cliente: 'Lab. Pesquisa USP', tipoIntervencao: 'Calibração', data: '2024-03-05', tecnico: 'Ana Costa', resultado: 'concluido' },
  { id: '5', numeroOS: 'OS-0044', equipamento: 'HPLC Waters e2695', cliente: 'Universidade Federal', tipoIntervencao: 'Preventiva', data: '2024-03-06', tecnico: 'Pedro Santos', resultado: 'concluido' },
  { id: '6', numeroOS: 'OS-0038', equipamento: 'GC Agilent 7890B', cliente: 'Petroquímica ABC', tipoIntervencao: 'Qualificação', data: '2024-02-28', tecnico: 'Carlos Lima', resultado: 'concluido' },
  { id: '7', numeroOS: 'OS-0039', equipamento: 'Freezer Meling -86°C', cliente: 'Biotecnologia Lab', tipoIntervencao: 'Corretiva', data: '2024-02-27', tecnico: 'Carlos Lima', resultado: 'nao_resolvido' },
  { id: '8', numeroOS: 'OS-0037', equipamento: 'Dissolutor Hanson SR8', cliente: 'Farmacêutica XYZ', tipoIntervencao: 'Treinamento', data: '2024-02-25', tecnico: 'Ana Costa', resultado: 'concluido' },
];

const RESULTADO_CONFIG = {
  concluido: { label: 'Concluído', className: 'bg-green-100 text-green-800 border-green-200' },
  parcial: { label: 'Parcial', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  nao_resolvido: { label: 'Não Resolvido', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function HistoricoIntervencoes() {
  const [busca, setBusca] = useState('');

  const historicoFiltrado = MOCK_HISTORICO.filter(
    (h) =>
      h.numeroOS.toLowerCase().includes(busca.toLowerCase()) ||
      h.equipamento.toLowerCase().includes(busca.toLowerCase()) ||
      h.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      h.tipoIntervencao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Histórico de Intervenções</h1>
        <p className="text-muted-foreground">Registro de todas as intervenções técnicas realizadas</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar OS, equipamento ou cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº OS</TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo Intervenção</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Técnico</TableHead>
              <TableHead>Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicoFiltrado.map((h) => (
              <TableRow key={h.id}>
                <TableCell className="font-mono text-xs font-medium">{h.numeroOS}</TableCell>
                <TableCell className="font-medium">{h.equipamento}</TableCell>
                <TableCell>{h.cliente}</TableCell>
                <TableCell>{h.tipoIntervencao}</TableCell>
                <TableCell>{formatarData(h.data)}</TableCell>
                <TableCell>{h.tecnico}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={RESULTADO_CONFIG[h.resultado].className}>
                    {RESULTADO_CONFIG[h.resultado].label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
