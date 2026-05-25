import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatarMoeda, formatarData } from '@/lib/formatters';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const DADOS_MENSAIS = [
  { mes: 'Jun', entradas: 1698000, saidas: 1210000 },
  { mes: 'Jul', entradas: 1721000, saidas: 1280000 },
  { mes: 'Ago', entradas: 1643000, saidas: 1195000 },
  { mes: 'Set', entradas: 1756000, saidas: 1320000 },
  { mes: 'Out', entradas: 1812000, saidas: 1350000 },
  { mes: 'Nov', entradas: 1847320, saidas: 1380000 },
];

const TRANSACOES_RECENTES = [
  { id: '1', data: '2024-11-18', tipo: 'entrada' as const, descricao: 'Recebimento - Farmácias Magnum', valor: 28450, saldo: 467320 },
  { id: '2', data: '2024-11-18', tipo: 'saida' as const, descricao: 'Pagamento - Phenomenex (Colunas)', valor: 34500, saldo: 432820 },
  { id: '3', data: '2024-11-17', tipo: 'entrada' as const, descricao: 'Recebimento - BioGen Biotecnologia', valor: 156200, saldo: 467320 },
  { id: '4', data: '2024-11-17', tipo: 'saida' as const, descricao: 'Folha de pagamento - Nov/2024', valor: 185000, saldo: 311120 },
  { id: '5', data: '2024-11-16', tipo: 'entrada' as const, descricao: 'Recebimento - Instituto de Pesquisas', valor: 234500, saldo: 496120 },
  { id: '6', data: '2024-11-16', tipo: 'saida' as const, descricao: 'Aluguel escritório - Nov/2024', valor: 8500, saldo: 261620 },
  { id: '7', data: '2024-11-15', tipo: 'entrada' as const, descricao: 'Recebimento - FarmaBrasil', valor: 67800, saldo: 270120 },
  { id: '8', data: '2024-11-15', tipo: 'saida' as const, descricao: 'Pagamento - Hamilton (Seringas)', valor: 12800, saldo: 202320 },
];

function formatarAbreviado(valor: number): string {
  if (valor >= 1_000_000) return `R$ ${(valor / 1_000_000).toFixed(1)}M`;
  if (valor >= 1_000) return `R$ ${(valor / 1_000).toFixed(0)}K`;
  return formatarMoeda(valor);
}

const entradasMes = DADOS_MENSAIS[DADOS_MENSAIS.length - 1].entradas;
const saidasMes = DADOS_MENSAIS[DADOS_MENSAIS.length - 1].saidas;
const saldoMes = entradasMes - saidasMes;
const projecao30 = saldoMes * 0.95;

export default function FluxoCaixa() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fluxo de Caixa</h1>
        <p className="text-muted-foreground">Acompanhamento de entradas e saídas mensais</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-100 text-green-600 rounded-lg p-2.5">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Entradas Mês</p>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(entradasMes)}</p>
          <p className="text-xs text-green-600 mt-1">Nov/2024</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-red-100 text-red-600 rounded-lg p-2.5">
              <TrendingDown className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Saídas Mês</p>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(saidasMes)}</p>
          <p className="text-xs text-red-600 mt-1">Nov/2024</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2.5">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Saldo</p>
          <p className="text-2xl font-bold mt-1 text-green-600">{formatarMoeda(saldoMes)}</p>
          <p className="text-xs text-muted-foreground mt-1">Entradas - Saídas</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-violet-100 text-violet-600 rounded-lg p-2.5">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Projeção 30 dias</p>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(projecao30)}</p>
          <p className="text-xs text-muted-foreground mt-1">Estimativa conservadora</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Entradas vs Saídas - Últimos 6 meses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DADOS_MENSAIS} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mes" className="text-xs" tick={{ fontSize: 12 }} />
                <YAxis
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatarAbreviado}
                  width={80}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    formatarMoeda(value),
                    name === 'entradas' ? 'Entradas' : 'Saídas',
                  ]}
                />
                <Legend
                  formatter={(value: string) => (
                    <span className="text-xs text-muted-foreground">
                      {value === 'entradas' ? 'Entradas' : 'Saídas'}
                    </span>
                  )}
                />
                <Bar dataKey="entradas" fill="#22C55E" radius={[4, 4, 0, 0]} name="entradas" />
                <Bar dataKey="saidas" fill="#EF4444" radius={[4, 4, 0, 0]} name="saidas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACOES_RECENTES.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{formatarData(t.data)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        t.tipo === 'entrada'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {t.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.descricao}</TableCell>
                  <TableCell className={`font-medium ${t.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.tipo === 'entrada' ? '+' : '-'}{formatarMoeda(t.valor)}
                  </TableCell>
                  <TableCell className="font-medium">{formatarMoeda(t.saldo)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
