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
import { formatarData } from '@/lib/formatters';

interface Lead {
  id: string;
  nome: string;
  empresa: string;
  segmento: string;
  origem: string;
  score: number;
  status: 'novo' | 'contatado' | 'qualificado' | 'perdido';
  data: string;
  vendedor: string;
}

const MOCK_LEADS: Lead[] = [
  { id: '1', nome: 'Dr. Ricardo Mendes', empresa: 'Farmácias Magnum', segmento: 'Farmacêutico', origem: 'Google', score: 85, status: 'qualificado', data: '2024-11-18', vendedor: 'Carlos Silva' },
  { id: '2', nome: 'Dra. Paula Ferreira', empresa: 'BioGen Biotecnologia', segmento: 'Biotecnológico', origem: 'LinkedIn', score: 72, status: 'contatado', data: '2024-11-17', vendedor: 'Ana Oliveira' },
  { id: '3', nome: 'Eng. Marcos Vieira', empresa: 'Química Analítica Ltda', segmento: 'Químico', origem: 'Evento', score: 90, status: 'qualificado', data: '2024-11-16', vendedor: 'Carlos Silva' },
  { id: '4', nome: 'Sra. Camila Souza', empresa: 'Alimentos Bom Sabor', segmento: 'Alimentos', origem: 'Indicação', score: 55, status: 'contatado', data: '2024-11-15', vendedor: 'Roberto Santos' },
  { id: '5', nome: 'Dr. André Lima', empresa: 'LabCrom Análises', segmento: 'Análises Clínicas', origem: 'Google', score: 68, status: 'novo', data: '2024-11-14', vendedor: 'Marina Costa' },
  { id: '6', nome: 'Dra. Juliana Reis', empresa: 'FarmaBrasil', segmento: 'Farmacêutico', origem: 'Blog', score: 45, status: 'contatado', data: '2024-11-13', vendedor: 'Fernanda Lima' },
  { id: '7', nome: 'Sr. Pedro Alves', empresa: 'ChemTech Solutions', segmento: 'Químico', origem: 'LinkedIn', score: 30, status: 'perdido', data: '2024-11-10', vendedor: 'Lucas Almeida' },
  { id: '8', nome: 'Dra. Beatriz Nascimento', empresa: 'Instituto de Pesquisas Bio', segmento: 'Biotecnológico', origem: 'Evento', score: 78, status: 'qualificado', data: '2024-11-09', vendedor: 'Carlos Silva' },
  { id: '9', nome: 'Sr. Eduardo Cardoso', empresa: 'NeoPharma Ltda', segmento: 'Farmacêutico', origem: 'Google', score: 62, status: 'novo', data: '2024-11-08', vendedor: 'Ana Oliveira' },
  { id: '10', nome: 'Dra. Leticia Moreira', empresa: 'VidaLab Diagnósticos', segmento: 'Análises Clínicas', origem: 'Indicação', score: 50, status: 'contatado', data: '2024-11-07', vendedor: 'Roberto Santos' },
];

const STATUS_CONFIG = {
  novo: { label: 'Novo', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  contatado: { label: 'Contatado', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  qualificado: { label: 'Qualificado', className: 'bg-green-100 text-green-800 border-green-200' },
  perdido: { label: 'Perdido', className: 'bg-red-100 text-red-800 border-red-200' },
};

function badgeScore(score: number) {
  if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
  if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200';
}

export default function Leads() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const leadsFiltrados = useMemo(() => {
    return MOCK_LEADS.filter((l) => {
      const matchBusca =
        l.nome.toLowerCase().includes(busca.toLowerCase()) ||
        l.empresa.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || l.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">Pipeline de leads e oportunidades de negócio</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar lead ou empresa..."
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
              <SelectItem value="novo">Novo</SelectItem>
              <SelectItem value="contatado">Contatado</SelectItem>
              <SelectItem value="qualificado">Qualificado</SelectItem>
              <SelectItem value="perdido">Perdido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Vendedor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadsFiltrados.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.nome}</TableCell>
                <TableCell>{l.empresa}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">{l.segmento}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{l.origem}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={badgeScore(l.score)}>
                    {l.score}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[l.status].className}>
                    {STATUS_CONFIG[l.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatarData(l.data)}</TableCell>
                <TableCell className="text-muted-foreground">{l.vendedor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
