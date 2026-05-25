import { useState } from 'react';
import { Search, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { formatarData } from '@/lib/formatters';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'gerente' | 'operador';
  status: 'ativo' | 'inativo';
  ultimoAcesso: string;
}

const MOCK_USUARIOS: Usuario[] = [
  { id: '1', nome: 'Marcos Almeida', email: 'marcos.almeida@allcrom.com.br', role: 'admin', status: 'ativo', ultimoAcesso: '2024-11-18 09:32' },
  { id: '2', nome: 'Carlos Silva', email: 'carlos.silva@allcrom.com.br', role: 'gerente', status: 'ativo', ultimoAcesso: '2024-11-18 08:45' },
  { id: '3', nome: 'Ana Oliveira', email: 'ana.oliveira@allcrom.com.br', role: 'gerente', status: 'ativo', ultimoAcesso: '2024-11-17 17:20' },
  { id: '4', nome: 'Roberto Santos', email: 'roberto.santos@allcrom.com.br', role: 'operador', status: 'ativo', ultimoAcesso: '2024-11-18 10:15' },
  { id: '5', nome: 'Patrícia Rocha', email: 'patricia.rocha@allcrom.com.br', role: 'operador', status: 'ativo', ultimoAcesso: '2024-11-16 14:50' },
  { id: '6', nome: 'Fernanda Lima', email: 'fernanda.lima@allcrom.com.br', role: 'operador', status: 'inativo', ultimoAcesso: '2024-10-28 11:00' },
];

const ROLE_CONFIG = {
  admin: { label: 'Admin', className: 'bg-red-100 text-red-800 border-red-200' },
  gerente: { label: 'Gerente', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  operador: { label: 'Operador', className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  gerente: 'Gerente',
  operador: 'Operador',
};

export default function Usuarios() {
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [novoRole, setNovoRole] = useState<string>('');

  const usuariosFiltrados = MOCK_USUARIOS.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase()),
  );

  function abrirEdicao(usuario: Usuario) {
    setUsuarioEditando(usuario);
    setNovoRole(usuario.role);
    setDialogAberto(true);
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
        <p className="text-muted-foreground">Gestão de usuários e acessos do sistema</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar usuário ou email..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuariosFiltrados.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.nome}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{u.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={ROLE_CONFIG[u.role].className}>
                    {ROLE_CONFIG[u.role].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={u.status === 'ativo' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}>
                    {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{formatarData(u.ultimoAcesso.split(' ')[0])} {u.ultimoAcesso.split(' ')[1]}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => abrirEdicao(u)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {usuarioEditando && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="font-medium">{usuarioEditando.nome}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{usuarioEditando.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Role</p>
                <Select value={novoRole} onValueChange={setNovoRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAberto(false)}>Cancelar</Button>
            <Button onClick={() => setDialogAberto(false)}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
