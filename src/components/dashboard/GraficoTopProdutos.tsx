import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { topProdutos } from '@/lib/mockData';
import { formatarMoeda } from '@/lib/formatters';

const dados = topProdutos.map((p) => ({
  ...p,
  descricaoCurta: p.descricao.length > 30 ? p.descricao.slice(0, 30) + '…' : p.descricao,
}));

export function GraficoTopProdutos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top 10 Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dados}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" className="text-[10px]" tick={{ fontSize: 10 }} />
              <YAxis
                type="category"
                dataKey="descricaoCurta"
                className="text-[10px]"
                tick={{ fontSize: 10 }}
                width={100}
              />
              <Tooltip
                formatter={(_value: number, _name: string, props: { payload: { descricao: string; quantidade: number; faturamento: number } }) => {
                  const p = props.payload;
                  return [
                    <span key="qty">{`${p.quantidade} un.`}</span>,
                    <span key="fat" className="block text-muted-foreground">{formatarMoeda(p.faturamento)}</span>,
                  ];
                }}
                labelFormatter={(label: string) => dados.find(d => d.descricaoCurta === label)?.descricao ?? label}
              />
              <Bar dataKey="quantidade" fill="#566DFB" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
