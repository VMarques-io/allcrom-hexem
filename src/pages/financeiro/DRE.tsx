import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatarMoeda } from '@/lib/formatters';

interface LinhaDRE {
  label: string;
  valor: number;
  tipo: 'receita' | 'deducao' | 'subtotal' | 'despesa' | 'resultado';
  indent: number;
}

const RECEITA_BRUTA = 1847320;
const DADOS_DRE: LinhaDRE[] = [
  { label: 'Receita Bruta', valor: RECEITA_BRUTA, tipo: 'receita', indent: 0 },
  { label: '(-) Deduções', valor: -92366, tipo: 'deducao', indent: 1 },
  { label: '= Receita Líquida', valor: RECEITA_BRUTA - 92366, tipo: 'subtotal', indent: 0 },
  { label: '(-) CMV', valor: -738928, tipo: 'despesa', indent: 1 },
  { label: '= Lucro Bruto', valor: RECEITA_BRUTA - 92366 - 738928, tipo: 'subtotal', indent: 0 },
  { label: '(-) Despesas Operacionais', valor: -352000, tipo: 'despesa', indent: 1 },
  { label: '   Despesas com Pessoal', valor: -185000, tipo: 'deducao', indent: 2 },
  { label: '   Despesas Administrativas', valor: -85000, tipo: 'deducao', indent: 2 },
  { label: '   Despesas Comerciais', valor: -62000, tipo: 'deducao', indent: 2 },
  { label: '   Depreciações', valor: -20000, tipo: 'deducao', indent: 2 },
  { label: '= Lucro Operacional', valor: RECEITA_BRUTA - 92366 - 738928 - 352000, tipo: 'subtotal', indent: 0 },
  { label: '(-) Impostos', valor: -129451, tipo: 'despesa', indent: 1 },
  { label: '= Lucro Líquido', valor: RECEITA_BRUTA - 92366 - 738928 - 352000 - 129451, tipo: 'resultado', indent: 0 },
];

const lucroLiquido = DADOS_DRE[DADOS_DRE.length - 1].valor;

function getRowStyle(tipo: LinhaDRE['tipo']) {
  switch (tipo) {
    case 'receita': return 'font-bold';
    case 'subtotal': return 'font-bold bg-muted/50';
    case 'resultado': return 'font-bold bg-primary/10 text-primary';
    case 'deducao': return 'text-red-600';
    case 'despesa': return 'text-red-600';
    default: return '';
  }
}

export default function DRE() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">DRE</h1>
        <p className="text-muted-foreground">Demonstração do Resultado do Exercício - Nov/2024</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">DRE - Novembro 2024</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Descrição</TableHead>
                <TableHead className="text-right">Valor (R$)</TableHead>
                <TableHead className="text-right">% da Receita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DADOS_DRE.map((linha, idx) => (
                <TableRow key={idx} className={getRowStyle(linha.tipo)}>
                  <TableCell style={{ paddingLeft: `${16 + linha.indent * 24}px` }}>
                    {linha.label}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {linha.valor < 0 ? `(${formatarMoeda(Math.abs(linha.valor))})` : formatarMoeda(linha.valor)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {((linha.valor / RECEITA_BRUTA) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Margem Bruta</p>
          <p className="text-2xl font-bold mt-1">
            {((DADOS_DRE.find(d => d.label === '= Lucro Bruto')!.valor / RECEITA_BRUTA) * 100).toFixed(1)}%
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Margem Operacional</p>
          <p className="text-2xl font-bold mt-1">
            {((DADOS_DRE.find(d => d.label === '= Lucro Operacional')!.valor / RECEITA_BRUTA) * 100).toFixed(1)}%
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Margem Líquida</p>
          <p className="text-2xl font-bold mt-1 text-primary">
            {((lucroLiquido / RECEITA_BRUTA) * 100).toFixed(1)}%
          </p>
        </Card>
      </div>
    </div>
  );
}
