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

interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  status: 'ativo' | 'ferias' | 'afastado';
  email: string;
}

const MOCK_COLABORADORES: Colaborador[] = [
  { id: '1', nome: 'Carlos Silva', cargo: 'Vendedor Sênior', departamento: 'Comercial', dataAdmissao: '2019-03-15', status: 'ativo', email: 'carlos.silva@allcrom.com.br' },
  { id: '2', nome: 'Ana Oliveira', cargo: 'Vendedora Sênior', departamento: 'Comercial', dataAdmissao: '2020-06-01', status: 'ativo', email: 'ana.oliveira@allcrom.com.br' },
  { id: '3', nome: 'Roberto Santos', cargo: 'Vendedor Pleno', departamento: 'Comercial', dataAdmissao: '2021-09-10', status: 'ativo', email: 'roberto.santos@allcrom.com.br' },
  { id: '4', nome: 'Marina Costa', cargo: 'Vendedora Plena', departamento: 'Comercial', dataAdmissao: '2022-01-20', status: 'ferias', email: 'marina.costa@allcrom.com.br' },
  { id: '5', nome: 'Dr. Lucas Mendes', cargo: 'Técnico de Campo', departamento: 'Assistência Técnica', dataAdmissao: '2020-11-05', status: 'ativo', email: 'lucas.mendes@allcrom.com.br' },
  { id: '6', nome: 'Dra. Fernanda Lima', cargo: 'Técnica de Laboratório', departamento: 'Assistência Técnica', dataAdmissao: '2021-04-12', status: 'afastado', email: 'fernanda.lima@allcrom.com.br' },
  { id: '7', nome: 'Patrícia Rocha', cargo: 'Assistente Administrativa', departamento: 'Administrativo', dataAdmissao: '2018-07-01', status: 'ativo', email: 'patricia.rocha@allcrom.com.br' },
  { id: '8', nome: 'Marcos Almeida', cargo: 'Gerente Financeiro', departamento: 'Financeiro', dataAdmissao: '2017-02-15', status: 'ativo', email: 'marcos.almeida@allcrom.com.br' },
];

const STATUS_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  ferias: { label: 'Férias', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  afastado: { label: 'Afastado', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default function Colaboradores() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const colaboradoresFiltrados = useMemo(() => {
    return MOCK_COLABORADORES.filter((c) => {
      const matchBusca =
        c.nome.toLowerCase().includes(busca.toLowerCase()) ||
        c.cargo.toLowerCase().includes(busca.toLowerCase()) ||
        c.departamento.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [busca, filtroStatus]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Colaboradores</h1>
        <p className="text-muted-foreground">Quadro de colaboradores da Allcrom</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar colaborador, cargo ou departamento..."
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
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="ferias">Férias</SelectItem>
              <SelectItem value="afastado">Afastado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Data Admissão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradoresFiltrados.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.nome}</TableCell>
                <TableCell>{c.cargo}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">{c.departamento}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatarData(c.dataAdmissao)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[c.status].className}>
                    {STATUS_CONFIG[c.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{c.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
