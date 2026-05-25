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

interface EquipamentoManutencao {
  id: string;
  equipamento: string;
  cliente: string;
  marca: string;
  numeroSerie: string;
  tipoManutencao: string;
  inicio: string;
  previsaoConclusao: string;
  status: 'em_manutencao' | 'aguardando_pecas' | 'em_qualificacao' | 'aguardando_retirada';
}

const MOCK_EQUIPAMENTOS: EquipamentoManutencao[] = [
  { id: '1', equipamento: 'HPLC Agilent 1260', cliente: 'Laboratório ABC', marca: 'Agilent', numeroSerie: 'AG1260-55201', tipoManutencao: 'Corretiva', inicio: '2024-03-15', previsaoConclusao: '2024-03-20', status: 'em_manutencao' },
  { id: '2', equipamento: 'Dissolutor Raytor RT-600', cliente: 'Hospital São Paulo', marca: 'Raytor', numeroSerie: 'RT600-44001', tipoManutencao: 'Instalação', inicio: '2024-03-13', previsaoConclusao: '2024-03-25', status: 'aguardando_pecas' },
  { id: '3', equipamento: 'GC Agilent 7890B', cliente: 'Petroquímica ABC', marca: 'Agilent', numeroSerie: 'AG7890-99001', tipoManutencao: 'Qualificação IQ/OQ', inicio: '2024-03-11', previsaoConclusao: '2024-03-18', status: 'em_qualificacao' },
  { id: '4', equipamento: 'Pipeta Gilson Pipetman P1000', cliente: 'Lab. Pesquisa USP', marca: 'Gilson', numeroSerie: 'GIL-P1000-771', tipoManutencao: 'Calibração', inicio: '2024-03-10', previsaoConclusao: '2024-03-11', status: 'aguardando_retirada' },
  { id: '5', equipamento: 'HPLC Waters e2695', cliente: 'Universidade Federal', marca: 'Waters', numeroSerie: 'WE2695-33201', tipoManutencao: 'Preventiva', inicio: '2024-03-12', previsaoConclusao: '2024-03-28', status: 'aguardando_pecas' },
  { id: '6', equipamento: 'Freezer Meling -86°C', cliente: 'Biotecnologia Lab', marca: 'Meling', numeroSerie: 'ML-86-2201', tipoManutencao: 'Corretiva', inicio: '2024-03-14', previsaoConclusao: '2024-03-21', status: 'em_manutencao' },
];

const STATUS_CONFIG = {
  em_manutencao: { label: 'Em Manutenção', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  aguardando_pecas: { label: 'Aguardando Peças', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  em_qualificacao: { label: 'Em Qualificação', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  aguardando_retirada: { label: 'Aguardando Retirada', className: 'bg-blue-100 text-blue-800 border-blue-200' },
};

export default function EquipamentosManutencao() {
  const [busca, setBusca] = useState('');

  const equipamentosFiltrados = MOCK_EQUIPAMENTOS.filter(
    (e) =>
      e.equipamento.toLowerCase().includes(busca.toLowerCase()) ||
      e.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      e.numeroSerie.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Equipamentos em Manutenção</h1>
        <p className="text-muted-foreground">Acompanhamento de equipamentos em serviço</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar equipamento, cliente ou nº série..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipamento</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Nº Série</TableHead>
              <TableHead>Tipo Manutenção</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Previsão Conclusão</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipamentosFiltrados.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.equipamento}</TableCell>
                <TableCell>{e.cliente}</TableCell>
                <TableCell>{e.marca}</TableCell>
                <TableCell className="font-mono text-xs">{e.numeroSerie}</TableCell>
                <TableCell>{e.tipoManutencao}</TableCell>
                <TableCell>{formatarData(e.inicio)}</TableCell>
                <TableCell>{formatarData(e.previsaoConclusao)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[e.status].className}>
                    {STATUS_CONFIG[e.status].label}
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
