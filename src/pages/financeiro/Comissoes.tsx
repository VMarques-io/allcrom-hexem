import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatarMoeda } from '@/lib/formatters';

interface Vendedor {
  id: string;
  nome: string;
  cargo: string;
  vendasMes: number;
  taxaConversao: number;
  metaMes: number;
  taxaComissao: number;
}

const MOCK_VENDEDORES: Vendedor[] = [
  { id: '1', nome: 'Carlos Silva', cargo: 'Vendedor Sênior', vendasMes: 285000, taxaConversao: 42, metaMes: 250000, taxaComissao: 4.5 },
  { id: '2', nome: 'Ana Oliveira', cargo: 'Vendedora Sênior', vendasMes: 268000, taxaConversao: 38, metaMes: 250000, taxaComissao: 4.5 },
  { id: '3', nome: 'Roberto Santos', cargo: 'Vendedor Pleno', vendasMes: 195000, taxaConversao: 35, metaMes: 200000, taxaComissao: 3.5 },
  { id: '4', nome: 'Marina Costa', cargo: 'Vendedora Plena', vendasMes: 178000, taxaConversao: 31, metaMes: 200000, taxaComissao: 3.5 },
  { id: '5', nome: 'Fernanda Lima', cargo: 'Vendedora Júnior', vendasMes: 142000, taxaConversao: 28, metaMes: 150000, taxaComissao: 2.5 },
  { id: '6', nome: 'Lucas Almeida', cargo: 'Vendedor Júnior', vendasMes: 118000, taxaConversao: 25, metaMes: 150000, taxaComissao: 2.5 },
];

function calcPercentMeta(vendas: number, meta: number) {
  return (vendas / meta) * 100;
}

function calcComissao(vendas: number, taxa: number) {
  return vendas * (taxa / 100);
}

export default function Comissoes() {
  const totalComissoes = MOCK_VENDEDORES.reduce(
    (acc, v) => acc + calcComissao(v.vendasMes, v.taxaComissao),
    0,
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Comissões</h1>
        <p className="text-muted-foreground">Acompanhamento de vendas e comissões da equipe comercial</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Total Vendas Mês</p>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(MOCK_VENDEDORES.reduce((a, v) => a + v.vendasMes, 0))}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Total Comissões</p>
          <p className="text-2xl font-bold mt-1">{formatarMoeda(totalComissoes)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Taxa Conversão Média</p>
          <p className="text-2xl font-bold mt-1">
            {(MOCK_VENDEDORES.reduce((a, v) => a + v.taxaConversao, 0) / MOCK_VENDEDORES.length).toFixed(1)}%
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Vendedores acima da meta</p>
          <p className="text-2xl font-bold mt-1">
            {MOCK_VENDEDORES.filter((v) => v.vendasMes >= v.metaMes).length}/{MOCK_VENDEDORES.length}
          </p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendedor</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead className="text-right">Vendas Mês</TableHead>
              <TableHead className="text-right">Taxa Conversão</TableHead>
              <TableHead className="text-right">Meta Mês</TableHead>
              <TableHead>% Meta</TableHead>
              <TableHead className="text-right">Comissão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_VENDEDORES.map((v) => {
              const pctMeta = calcPercentMeta(v.vendasMes, v.metaMes);
              const comissao = calcComissao(v.vendasMes, v.taxaComissao);
              return (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.nome}</TableCell>
                  <TableCell className="text-muted-foreground">{v.cargo}</TableCell>
                  <TableCell className="text-right font-mono">{formatarMoeda(v.vendasMes)}</TableCell>
                  <TableCell className="text-right">{v.taxaConversao}%</TableCell>
                  <TableCell className="text-right font-mono">{formatarMoeda(v.metaMes)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(pctMeta, 100)} className="h-2 flex-1" />
                      <span className={`text-xs font-medium ${pctMeta >= 100 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {pctMeta.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-primary">
                    {formatarMoeda(comissao)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
