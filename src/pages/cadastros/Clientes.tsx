import { useState, useMemo } from 'react';
import { Search, Plus, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { formatarCNPJ, formatarTelefone } from '@/lib/formatters';
import { SEGMENTOS } from '@/lib/constants';

interface Cliente {
  id: string;
  razaoSocial: string;
  cnpj: string;
  nomeFantasia: string;
  segmento: string;
  cidade: string;
  uf: string;
  contato: string;
  telefone: string;
  email: string;
  score: number;
  status: 'ativo' | 'inativo';
}

const MOCK_CLIENTES: Cliente[] = [
  { id: '1', razaoSocial: 'BioGen Biotecnologia Ltda', cnpj: '12345678000190', nomeFantasia: 'BioGen', segmento: 'biotecnologia', cidade: 'São Paulo', uf: 'SP', contato: 'Dr. Ricardo Mendes', telefone: '11987654321', email: 'ricardo@biogen.com.br', score: 92, status: 'ativo' },
  { id: '2', razaoSocial: 'Farmacêutica Magnum S.A.', cnpj: '23456789000181', nomeFantasia: 'Magnum Farma', segmento: 'saude', cidade: 'Rio de Janeiro', uf: 'RJ', contato: 'Ana Beatriz Costa', telefone: '21976543210', email: 'ana@magnumfarma.com.br', score: 85, status: 'ativo' },
  { id: '3', razaoSocial: 'LabCrom Análises Clínicas', cnpj: '34567890000172', nomeFantasia: 'LabCrom', segmento: 'cromatografia', cidade: 'Belo Horizonte', uf: 'MG', contato: 'Fernando Lima', telefone: '31965432109', email: 'fernando@labcrom.com.br', score: 78, status: 'ativo' },
  { id: '4', razaoSocial: 'Química Analítica do Brasil', cnpj: '45678901000163', nomeFantasia: 'QAB Química', segmento: 'cromatografia', cidade: 'Campinas', uf: 'SP', contato: 'Dra. Patrícia Alves', telefone: '19954321098', email: 'patricia@qab.com.br', score: 65, status: 'ativo' },
  { id: '5', razaoSocial: 'Alimentos Bom Sabor S.A.', cnpj: '56789012000154', nomeFantasia: 'Bom Sabor', segmento: 'cromatografia', cidade: 'Curitiba', uf: 'PR', contato: 'Marcos Oliveira', telefone: '41943210987', email: 'marcos@bomsabor.com.br', score: 55, status: 'ativo' },
  { id: '6', razaoSocial: 'Instituto de Pesquisas Biomédicas', cnpj: '67890123000145', nomeFantasia: 'IPB', segmento: 'biotecnologia', cidade: 'Ribeirão Preto', uf: 'SP', contato: 'Dr. Carlos Eduardo', telefone: '16932109876', email: 'carlos@ipb.org.br', score: 88, status: 'ativo' },
  { id: '7', razaoSocial: 'Cromatografia & Cia', cnpj: '78901234000136', nomeFantasia: 'Crom&Cia', segmento: 'cromatografia', cidade: 'Porto Alegre', uf: 'RS', contato: 'Luciana Santos', telefone: '51921098765', email: 'luciana@cromcia.com.br', score: 42, status: 'inativo' },
  { id: '8', razaoSocial: 'Hospitais Unidos S.A.', cnpj: '89012345000127', nomeFantasia: 'HU Saúde', segmento: 'saude', cidade: 'Salvador', uf: 'BA', contato: 'Dr. Roberto Nunes', telefone: '71910987654', email: 'roberto@husaude.com.br', score: 71, status: 'ativo' },
  { id: '9', razaoSocial: 'Universidade Federal - Lab Central', cnpj: '90123456000118', nomeFantasia: 'UF Lab Central', segmento: 'biotecnologia', cidade: 'Brasília', uf: 'DF', contato: 'Profa. Mariana Lopes', telefone: '61909876543', email: 'mariana@uf.edu.br', score: 48, status: 'inativo' },
  { id: '10', razaoSocial: 'Indústria Química Nacional', cnpj: '01234567000199', nomeFantasia: 'IQN', segmento: 'cromatografia', cidade: 'Joinville', uf: 'SC', contato: 'Eng. Thiago Ferreira', telefone: '47988776655', email: 'thiago@iqn.com.br', score: 83, status: 'ativo' },
];

const SCORE_CONFIG = {
  high: { className: 'bg-green-100 text-green-800' },
  medium: { className: 'bg-yellow-100 text-yellow-800' },
  low: { className: 'bg-red-100 text-red-800' },
};

const STATUS_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  inativo: { label: 'Inativo', className: 'bg-red-100 text-red-800 border-red-200' },
};

const UFS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

export default function Clientes() {
  const [busca, setBusca] = useState('');
  const [filtroSegmento, setFiltroSegmento] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    razaoSocial: '',
    cnpj: '',
    segmento: '',
    nomeFantasia: '',
    cidade: '',
    uf: '',
    contato: '',
    telefone: '',
    email: '',
    status: 'ativo',
  });

  const clientesFiltrados = useMemo(() => {
    return MOCK_CLIENTES.filter((c) => {
      const matchBusca =
        c.razaoSocial.toLowerCase().includes(busca.toLowerCase()) ||
        c.cnpj.includes(busca) ||
        c.contato.toLowerCase().includes(busca.toLowerCase());
      const matchSegmento = filtroSegmento === 'todos' || c.segmento === filtroSegmento;
      const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus;
      return matchBusca && matchSegmento && matchStatus;
    });
  }, [busca, filtroSegmento, filtroStatus]);

  const getScoreConfig = (score: number) => {
    if (score >= 80) return SCORE_CONFIG.high;
    if (score >= 60) return SCORE_CONFIG.medium;
    return SCORE_CONFIG.low;
  };

  const getSegmentoLabel = (value: string) => {
    const found = SEGMENTOS.find((s) => s.value === value);
    return found ? found.label : value;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Cadastro e gestão de clientes</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="razaoSocial">Razão Social</Label>
                <Input id="razaoSocial" value={novoCliente.razaoSocial} onChange={(e) => setNovoCliente({ ...novoCliente, razaoSocial: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" value={novoCliente.cnpj} onChange={(e) => setNovoCliente({ ...novoCliente, cnpj: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="segmento">Segmento</Label>
                <Select value={novoCliente.segmento} onValueChange={(v) => setNovoCliente({ ...novoCliente, segmento: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {SEGMENTOS.filter((s) => s.value !== 'todos').map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                <Input id="nomeFantasia" value={novoCliente.nomeFantasia} onChange={(e) => setNovoCliente({ ...novoCliente, nomeFantasia: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" value={novoCliente.cidade} onChange={(e) => setNovoCliente({ ...novoCliente, cidade: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>UF</Label>
                  <Select value={novoCliente.uf} onValueChange={(v) => setNovoCliente({ ...novoCliente, uf: v })}>
                    <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                    <SelectContent>
                      {UFS.map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contato">Contato</Label>
                <Input id="contato" value={novoCliente.contato} onChange={(e) => setNovoCliente({ ...novoCliente, contato: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={novoCliente.telefone} onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={novoCliente.email} onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={novoCliente.status} onValueChange={(v) => setNovoCliente({ ...novoCliente, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={() => { setDialogOpen(false); }}>Cadastrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por razão social, CNPJ ou contato..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroSegmento} onValueChange={setFiltroSegmento}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Segmento" />
            </SelectTrigger>
            <SelectContent>
              {SEGMENTOS.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Razão Social</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Cidade/UF</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientesFiltrados.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.razaoSocial}</TableCell>
                <TableCell className="font-mono text-xs">{formatarCNPJ(c.cnpj)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {getSegmentoLabel(c.segmento)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {c.cidade}/{c.uf}
                </TableCell>
                <TableCell>{c.contato}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getScoreConfig(c.score).className}>
                    {c.score}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CONFIG[c.status].className}>
                    {STATUS_CONFIG[c.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setClienteSelecionado(c); setSheetOpen(true); }}
                  >
                    👁
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          {clienteSelecionado && (
            <>
              <SheetHeader>
                <SheetTitle>{clienteSelecionado.razaoSocial}</SheetTitle>
                <SheetDescription>{clienteSelecionado.nomeFantasia}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
                    {clienteSelecionado.razaoSocial.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold">{clienteSelecionado.razaoSocial}</p>
                    <p className="text-sm text-muted-foreground">{clienteSelecionado.nomeFantasia}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CNPJ</span>
                    <span className="font-mono">{formatarCNPJ(clienteSelecionado.cnpj)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Segmento</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      {getSegmentoLabel(clienteSelecionado.segmento)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cidade/UF</span>
                    <span>{clienteSelecionado.cidade}/{clienteSelecionado.uf}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Contato</span>
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{clienteSelecionado.contato}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Telefone</span>
                    <span>{formatarTelefone(clienteSelecionado.telefone)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">E-mail</span>
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{clienteSelecionado.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Score</span>
                    <Badge variant="outline" className={getScoreConfig(clienteSelecionado.score).className}>
                      {clienteSelecionado.score}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className={STATUS_CONFIG[clienteSelecionado.status].className}>
                      {STATUS_CONFIG[clienteSelecionado.status].label}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">Histórico de Compras</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm p-2 rounded bg-muted">
                      <span>Colunas HPLC Luna C18 - Lote 2024A</span>
                      <span className="font-medium">R$ 34.500,00</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 rounded bg-muted">
                      <span>Seringas Hamilton 100µL - Reposição</span>
                      <span className="font-medium">R$ 12.800,00</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 rounded bg-muted">
                      <span>Pipetas Gilson Pipetman - Pedido G-007</span>
                      <span className="font-medium">R$ 18.900,00</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}