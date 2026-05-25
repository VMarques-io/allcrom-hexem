import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const ROLES = [
  { id: 'admin', label: 'Admin' },
  { id: 'gerente', label: 'Gerente' },
  { id: 'operador', label: 'Operador' },
];

const MODULOS = [
  'Dashboard',
  'Pedidos',
  'Cotações',
  'Produtos',
  'Clientes',
  'Fornecedores',
  'Estoque - Entradas',
  'Estoque - Saídas',
  'Estoque - Inventário',
  'Compras - Requisições',
  'Compras - Cotações',
  'Compras - Pedidos',
  'Financeiro - Contas a Pagar',
  'Financeiro - Contas a Receber',
  'Financeiro - Fluxo de Caixa',
  'Assistência - Ordens de Serviço',
  'Marketing - Campanhas',
  'Marketing - Leads',
  'RH - Colaboradores',
  'Governança - Usuários',
  'Governança - Permissões',
  'Governança - Configurações',
];

const PERMISSOES: Record<string, Record<string, boolean>> = {
  admin: Object.fromEntries(MODULOS.map((m) => [m, true])),
  gerente: Object.fromEntries(
    MODULOS.map((m) => [
      m,
      !m.startsWith('Governança - Usuários') && !m.startsWith('Governança - Permissões'),
    ]),
  ),
  operador: Object.fromEntries(
    MODULOS.map((m) => [
      m,
      m === 'Dashboard' ||
        m.startsWith('Pedidos') ||
        m.startsWith('Cotações') ||
        m.startsWith('Estoque') ||
        m.startsWith('Assistência'),
    ]),
  ),
};

export default function Permissoes() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Permissões</h1>
        <p className="text-muted-foreground">Matriz de permissões por perfil de acesso</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground sticky left-0 bg-card min-w-[200px]">
                    Módulo
                  </th>
                  {ROLES.map((role) => (
                    <th key={role.id} className="text-center p-3 text-sm font-medium min-w-[120px]">
                      {role.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODULOS.map((modulo) => (
                  <tr key={modulo} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-3 text-sm font-medium sticky left-0 bg-card">
                      {modulo}
                    </td>
                    {ROLES.map((role) => (
                      <td key={role.id} className="text-center p-3">
                        <Checkbox
                          checked={PERMISSOES[role.id]?.[modulo] ?? false}
                          disabled
                          className="mx-auto"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
