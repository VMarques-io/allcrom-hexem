import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatarMoeda } from '@/lib/formatters';
import { Users, Target, TrendingUp, Globe } from 'lucide-react';

const LEADS_MES = [
  { mes: 'Jun', leads: 145 },
  { mes: 'Jul', leads: 168 },
  { mes: 'Ago', leads: 152 },
  { mes: 'Set', leads: 189 },
  { mes: 'Out', leads: 210 },
  { mes: 'Nov', leads: 234 },
];

const LEADS_ORIGEM = [
  { nome: 'Google', valor: 78 },
  { nome: 'LinkedIn', valor: 52 },
  { nome: 'Eventos', valor: 38 },
  { nome: 'Indicação', valor: 41 },
  { nome: 'Blog', valor: 25 },
];

const CORES_ORIGEM: Record<string, string> = {
  'Google': '#566DFB',
  'LinkedIn': '#0A66C2',
  'Eventos': '#8B5CF6',
  'Indicação': '#22C55E',
  'Blog': '#F59E0B',
};

function formatarAbreviado(valor: number): string {
  if (valor >= 1_000_000) return `R$ ${(valor / 1_000_000).toFixed(1)}M`;
  if (valor >= 1_000) return `R$ ${(valor / 1_000).toFixed(0)}K`;
  return formatarMoeda(valor);
}

export default function DashboardMarketing() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Marketing</h1>
        <p className="text-muted-foreground">Visão geral das métricas de marketing e captação de leads</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-blue-100 text-blue-600 rounded-lg p-2.5">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Leads Mês</p>
          <p className="text-2xl font-bold mt-1">234</p>
          <p className="text-xs text-green-600 mt-1">+11.4% vs mês anterior</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-100 text-green-600 rounded-lg p-2.5">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Conversão</p>
          <p className="text-2xl font-bold mt-1">18.4%</p>
          <p className="text-xs text-green-600 mt-1">+2.1pp vs mês anterior</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-violet-100 text-violet-600 rounded-lg p-2.5">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">ROI Campanhas</p>
          <p className="text-2xl font-bold mt-1">3.2x</p>
          <p className="text-xs text-green-600 mt-1">Acima da meta de 2.5x</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-amber-100 text-amber-600 rounded-lg p-2.5">
              <Globe className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Visitas Site</p>
          <p className="text-2xl font-bold mt-1">12.4K</p>
          <p className="text-xs text-green-600 mt-1">+8.7% vs mês anterior</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LEADS_MES} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" className="text-xs" tick={{ fontSize: 12 }} />
                  <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#566DFB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads por Origem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LEADS_ORIGEM}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="valor"
                    nameKey="nome"
                  >
                    {LEADS_ORIGEM.map((entry) => (
                      <Cell key={entry.nome} fill={CORES_ORIGEM[entry.nome] ?? '#6B7280'} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value} leads`, name]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span className="text-xs text-muted-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
