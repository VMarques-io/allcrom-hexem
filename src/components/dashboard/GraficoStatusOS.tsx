import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { statusOS } from '@/lib/mockData';

const CORES: Record<string, string> = {
  'Aberta': '#F59E0B',
  'Em Andamento': '#22C55E',
  'Aguardando Peça': '#EF4444',
  'Concluída': '#6B7280',
};

export function GraficoStatusOS() {
  const total = statusOS.reduce((acc, s) => acc + s.valor, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Status das OS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[300px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusOS}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
                dataKey="valor"
                nameKey="nome"
                stroke="none"
              >
                {statusOS.map((entry) => (
                  <Cell key={entry.nome} fill={CORES[entry.nome] ?? '#6B7280'} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} OS`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold">{total}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Total OS</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {statusOS.map((s) => (
            <div key={s.nome} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: CORES[s.nome] }}
              />
              <span className="text-xs text-muted-foreground">{s.nome} ({s.valor})</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
