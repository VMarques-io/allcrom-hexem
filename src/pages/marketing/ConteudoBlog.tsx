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

interface Artigo {
  id: string;
  titulo: string;
  categoria: 'HPLC' | 'Microamostragem' | 'PFAS' | 'GC' | 'SPE' | 'Saúde';
  status: 'rascunho' | 'publicado' | 'agendado';
  dataPublicacao: string;
  views: number;
  ctr: number;
}

const MOCK_ARTIGOS: Artigo[] = [
  { id: '1', titulo: 'Métodos HPLC Validados para Análise de Impurezas da Semaglutida', categoria: 'HPLC', status: 'publicado', dataPublicacao: '2024-11-10', views: 1240, ctr: 4.2 },
  { id: '2', titulo: 'Nova Linha de Produtos para Biotecnologia', categoria: 'Saúde', status: 'publicado', dataPublicacao: '2024-11-05', views: 890, ctr: 3.8 },
  { id: '3', titulo: 'Dispositivos de Coleta Inteligente Tasso', categoria: 'Microamostragem', status: 'publicado', dataPublicacao: '2024-10-28', views: 1560, ctr: 5.1 },
  { id: '4', titulo: 'GC/MS Quadrupolo MAESTRO-αMS', categoria: 'GC', status: 'agendado', dataPublicacao: '2024-11-25', views: 0, ctr: 0 },
  { id: '5', titulo: 'Extração em Fase Sólida mais Rápida e Limpa', categoria: 'SPE', status: 'publicado', dataPublicacao: '2024-10-15', views: 720, ctr: 3.5 },
  { id: '6', titulo: 'Como Acelerar Suas Análises de HPLC', categoria: 'HPLC', status: 'publicado', dataPublicacao: '2024-10-08', views: 2100, ctr: 6.3 },
  { id: '7', titulo: 'Transição do Hélio para Hidrogênio', categoria: 'GC', status: 'rascunho', dataPublicacao: '', views: 0, ctr: 0 },
  { id: '8', titulo: 'Microamostragem VAMS no TDM de Grávidas', categoria: 'Microamostragem', status: 'agendado', dataPublicacao: '2024-12-02', views: 0, ctr: 0 },
];

const CATEGORIA_CONFIG = {
  HPLC: { className: 'bg-blue-100 text-blue-800 border-blue-200' },
  Microamostragem: { className: 'bg-violet-100 text-violet-800 border-violet-200' },
  PFAS: { className: 'bg-amber-100 text-amber-800 border-amber-200' },
  GC: { className: 'bg-green-100 text-green-800 border-green-200' },
  SPE: { className: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  Saúde: { className: 'bg-pink-100 text-pink-800 border-pink-200' },
};

const STATUS_CONFIG = {
  rascunho: { label: 'Rascunho', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  publicado: { label: 'Publicado', className: 'bg-green-100 text-green-800 border-green-200' },
  agendado: { label: 'Agendado', className: 'bg-blue-100 text-blue-800 border-blue-200' },
};

export default function ConteudoBlog() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const artigosFiltrados = useMemo(() => {
    return MOCK_ARTIGOS.filter((a) => {
      const matchBusca = a.titulo.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || a.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conteúdo Blog</h1>
        <p className="text-muted-foreground">Gestão de artigos e conteúdo do blog Allcrom</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar artigo..."
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
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="publicado">Publicado</SelectItem>
              <SelectItem value="agendado">Agendado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Publicação</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">CTR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artigosFiltrados.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium max-w-[300px]">{a.titulo}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={CATEGORIA_CONFIG[a.categoria].className}>
                    {a.categoria}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[a.status].className}>
                    {STATUS_CONFIG[a.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {a.dataPublicacao ? formatarData(a.dataPublicacao) : '-'}
                </TableCell>
                <TableCell className="text-right">{a.views > 0 ? a.views.toLocaleString('pt-BR') : '-'}</TableCell>
                <TableCell className="text-right">{a.ctr > 0 ? `${a.ctr.toFixed(1)}%` : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
