import { useMemo } from 'react';
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
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatarMoeda } from '@/lib/formatters';

interface ProdutoMargem {
  id: string;
  produto: string;
  precoCusto: number;
  precoVenda: number;
  volume30d: number;
}

const MOCK_PRODUTOS: ProdutoMargem[] = [
  { id: '1', produto: 'Espectrômetro CAMAG TLC Scanner', precoCusto: 392000, precoVenda: 560000, volume30d: 1 },
  { id: '2', produto: 'Freezer -86°C Meling DW-HL388', precoCusto: 346000, precoVenda: 494000, volume30d: 1 },
  { id: '3', produto: 'Dissolutor Raytor RT6', precoCusto: 336000, precoVenda: 480000, volume30d: 1 },
  { id: '4', produto: 'Centrífuga Scilogex D2012 Plus', precoCusto: 229600, precoVenda: 328000, volume30d: 2 },
  { id: '5', produto: 'Purificador de Água Rephile Roz 100', precoCusto: 157500, precoVenda: 225000, volume30d: 3 },
  { id: '6', produto: 'Coluna Luna C18 5µm 250x4.6mm', precoCusto: 1250, precoVenda: 1800, volume30d: 87 },
  { id: '7', produto: 'Coluna Kinetex C18 2.6µm 100x4.6mm', precoCusto: 1320, precoVenda: 1900, volume30d: 74 },
  { id: '8', produto: 'Dispositivo Tasso M20', precoCusto: 112, precoVenda: 168, volume30d: 200 },
  { id: '9', produto: 'Pipeta P1000 Gilson Pipetman', precoCusto: 1050, precoVenda: 1500, volume30d: 62 },
  { id: '10', produto: 'Mitra VAMS 30µL', precoCusto: 32, precoVenda: 52, volume30d: 350 },
  { id: '11', produto: 'Coluna Zebron ZB-5 30m 0.25mm', precoCusto: 840, precoVenda: 1100, volume30d: 35 },
  { id: '12', produto: 'Seringa Hamilton 100µL', precoCusto: 440, precoVenda: 600, volume30d: 58 },
  { id: '13', produto: 'Cartucho Strata-X 200mg', precoCusto: 28, precoVenda: 42, volume30d: 180 },
  { id: '14', produto: 'GC/MS MAESTRO-αMS Quadrupolo', precoCusto: 280000, precoVenda: 380000, volume30d: 0 },
  { id: '15', produto: 'Kit Diagnóstico Rápido', precoCusto: 85, precoVenda: 110, volume30d: 45 },
];

function calcMargemPct(custo: number, venda: number) {
  return ((venda - custo) / venda) * 100;
}

function calcRentabilidade(custo: number, venda: number, volume: number) {
  return (venda - custo) * volume;
}

function corMargem(margem: number) {
  if (margem < 15) return 'text-red-600';
  if (margem <= 30) return 'text-yellow-600';
  return 'text-green-600';
}

function badgeMargem(margem: number) {
  if (margem < 15) return 'bg-red-100 text-red-800 border-red-200';
  if (margem <= 30) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-green-100 text-green-800 border-green-200';
}

export default function MargemProduto() {
  const dados = useMemo(() => {
    return MOCK_PRODUTOS.map((p) => {
      const margemPct = calcMargemPct(p.precoCusto, p.precoVenda);
      const margemRS = p.precoVenda - p.precoCusto;
      const rentabilidade = calcRentabilidade(p.precoCusto, p.precoVenda, p.volume30d);
      return { ...p, margemPct, margemRS, rentabilidade };
    }).sort((a, b) => b.rentabilidade - a.rentabilidade);
  }, []);

  const top15Chart = dados.slice(0, 15).map((d) => ({
    nome: d.produto.length > 35 ? d.produto.slice(0, 35) + '…' : d.produto,
    rentabilidade: d.rentabilidade,
  }));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Margem por Produto</h1>
        <p className="text-muted-foreground">Análise de rentabilidade e margem de contribuição por produto</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top 15 Produtos por Rentabilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top15Chart} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRentabilidade" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#C084FC" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                <XAxis type="number" className="text-xs" tick={{ fontSize: 12 }} tickFormatter={formatarMoeda} />
                <YAxis type="category" dataKey="nome" className="text-xs" tick={{ fontSize: 10 }} width={180} />
                <Tooltip formatter={(value: any) => [formatarMoeda(value), 'Rentabilidade']} />
                <Bar dataKey="rentabilidade" fill="url(#colorRentabilidade)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Preço Custo</TableHead>
              <TableHead className="text-right">Preço Venda</TableHead>
              <TableHead className="text-right">Margem %</TableHead>
              <TableHead className="text-right">Margem R$</TableHead>
              <TableHead className="text-right">Volume 30d</TableHead>
              <TableHead className="text-right">Rentabilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dados.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.produto}</TableCell>
                <TableCell className="text-right font-mono">{formatarMoeda(d.precoCusto)}</TableCell>
                <TableCell className="text-right font-mono">{formatarMoeda(d.precoVenda)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={badgeMargem(d.margemPct)}>
                    {d.margemPct.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className={`text-right font-mono ${corMargem(d.margemPct)}`}>
                  {formatarMoeda(d.margemRS)}
                </TableCell>
                <TableCell className="text-right">{d.volume30d}</TableCell>
                <TableCell className="text-right font-mono font-bold">{formatarMoeda(d.rentabilidade)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
