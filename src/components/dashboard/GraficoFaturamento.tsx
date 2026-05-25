import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faturamentoMensal } from '@/lib/mockData';
import { formatarMoeda } from '@/lib/formatters';

function formatarAbreviado(valor: number): string {
  if (valor >= 1_000_000) return `R$ ${(valor / 1_000_000).toFixed(1)}M`;
  if (valor >= 1_000) return `R$ ${(valor / 1_000).toFixed(0)}K`;
  return formatarMoeda(valor);
}

export function GraficoFaturamento() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Faturamento Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={faturamentoMensal} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#566DFB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#566DFB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="mes" className="text-[10px]" tick={{ fontSize: 10 }} interval={0} />
              <YAxis
                className="text-[10px]"
                tick={{ fontSize: 10 }}
                tickFormatter={formatarAbreviado}
                width={60}
              />
              <Tooltip
                formatter={(value: number) => [formatarMoeda(value), 'Faturamento']}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#566DFB"
                fill="url(#colorFaturamento)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
