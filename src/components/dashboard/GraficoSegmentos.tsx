import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pedidosPorSegmento } from '@/lib/mockData';

const CORES: Record<string, string> = {
  'Farmacêutico': '#566DFB',
  'Biotecnológico': '#8B5CF6',
  'Químico': '#3B82F6',
  'Alimentos': '#22C55E',
  'Análises Clínicas': '#F59E0B',
  'Outros': '#6B7280',
};

function renderCustomLabel(props: any) {
  const { name, percent } = props;
  return `${name} ${(percent * 100).toFixed(0)}%`;
}

export function GraficoSegmentos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pedidos por Segmento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pedidosPorSegmento}
                cx="50%"
                cy="45%"
                innerRadius={40}
                outerRadius={70}
                dataKey="valor"
                nameKey="nome"
                label={renderCustomLabel}
                labelLine={false}
              >
                {pedidosPorSegmento.map((entry) => (
                  <Cell key={entry.nome} fill={CORES[entry.nome] ?? '#6B7280'} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any) => [`${value}%`, name]}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={6}
                formatter={(value: string) => (
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
