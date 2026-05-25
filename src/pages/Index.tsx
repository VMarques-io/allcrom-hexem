import { ShoppingCart, DollarSign, Wrench, AlertTriangle, TrendingUp, Star, Package, Clock, AlertCircle, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CartaoKPI } from '@/components/dashboard/CartaoKPI';
import { GraficoFaturamento } from '@/components/dashboard/GraficoFaturamento';
import { GraficoSegmentos } from '@/components/dashboard/GraficoSegmentos';
import { GraficoTopProdutos } from '@/components/dashboard/GraficoTopProdutos';
import { GraficoStatusOS } from '@/components/dashboard/GraficoStatusOS';
import { ultimosPedidos, osProximasPrazo, alertasSistema } from '@/lib/mockData';
import { formatarMoeda, formatarData } from '@/lib/formatters';

const STATUS_COR: Record<string, string> = {
  pendente: 'bg-gray-100 text-gray-700',
  confirmado: 'bg-blue-100 text-blue-700',
  em_producao: 'bg-yellow-100 text-yellow-700',
  expedido: 'bg-purple-100 text-purple-700',
  em_transito: 'bg-orange-100 text-orange-700',
  entregue: 'bg-green-100 text-green-700',
  cancelado: 'bg-red-100 text-red-700',
};

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  em_producao: 'Em Produção',
  expedido: 'Expedido',
  em_transito: 'Em Trânsito',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
};

const PRIORIDADE_COR: Record<string, string> = {
  baixa: 'bg-gray-100 text-gray-700',
  media: 'bg-blue-100 text-blue-700',
  alta: 'bg-orange-100 text-orange-700',
  critica: 'bg-red-100 text-red-700',
};

const PRIORIDADE_LABEL: Record<string, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
  critica: 'Crítica',
};

const ALERTA_ICONE: Record<string, typeof Package> = {
  estoque: Package,
  os: Clock,
  financeiro: AlertCircle,
};

function getDataAtual() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Index() {
  return (
    <div className="space-y-6 p-3 sm:p-4 lg:p-6">
      <div className="modulo-header">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Painel Executivo</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Visão geral da operação Allcrom</p>
        </div>
        <p className="text-[10px] sm:text-sm text-muted-foreground shrink-0">{getDataAtual()}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <CartaoKPI titulo="Pedidos do Mês" valor="247" variacao="+12%" tipoVariacao="positivo" icone={ShoppingCart} />
        <CartaoKPI titulo="Faturamento" valor="R$ 1.847.320" variacao="+8,3%" tipoVariacao="positivo" icone={DollarSign} />
        <CartaoKPI titulo="OS Abertas" valor="34" variacao="7 urgentes" tipoVariacao="negativo" icone={Wrench} />
        <CartaoKPI titulo="Estoque em Alerta" valor="23 itens" variacao="+3" tipoVariacao="negativo" icone={AlertTriangle} />
        <CartaoKPI titulo="Taxa Conversão" valor="34%" variacao="+5pp" tipoVariacao="positivo" icone={TrendingUp} />
        <CartaoKPI titulo="NPS Clientes" valor="82" variacao="estável" tipoVariacao="neutro" icone={Star} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <GraficoFaturamento />
        <GraficoSegmentos />
        <GraficoTopProdutos />
        <GraficoStatusOS />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Últimos Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Nº</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ultimosPedidos.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-[10px] sm:text-xs truncate max-w-[80px]">{p.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm truncate max-w-[120px]">{p.cliente}</TableCell>
                    <TableCell className="text-right text-xs sm:text-sm truncate">{formatarMoeda(p.valor)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={STATUS_COR[p.status]}>
                        {STATUS_LABEL[p.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[10px] sm:text-xs text-muted-foreground hidden sm:table-cell">{formatarData(p.data)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">OS Próximas do Prazo</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Nº OS</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Prioridade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {osProximasPrazo.map((os) => (
                  <TableRow key={os.id}>
                    <TableCell className="font-medium text-[10px] sm:text-xs truncate max-w-[80px]">{os.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm truncate max-w-[100px]">{os.equipamento}</TableCell>
                    <TableCell className="text-xs sm:text-sm truncate max-w-[120px]">{os.cliente}</TableCell>
                    <TableCell className="text-[10px] sm:text-xs text-muted-foreground hidden sm:table-cell">{formatarData(os.prazo)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={PRIORIDADE_COR[os.prioridade]}>
                        {PRIORIDADE_LABEL[os.prioridade]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Alertas do Sistema</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {alertasSistema.map((alerta, i) => {
              const Icone = ALERTA_ICONE[alerta.tipo] ?? AlertCircle;
              return (
                <div key={i} className="flex items-start gap-2 sm:gap-3 py-2 border-b last:border-0">
                  <div className="mt-0.5 rounded-lg bg-muted p-1.5 shrink-0">
                    <Icone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm truncate">{alerta.descricao}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap shrink-0">{alerta.tempo}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
