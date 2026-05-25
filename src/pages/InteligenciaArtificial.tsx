import { Sparkles, TrendingUp, AlertTriangle, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FEATURES = [
  {
    titulo: 'Previsão de Demanda',
    descricao: 'Algoritmo de previsão baseado em histórico de vendas e sazonalidade para otimizar estoque.',
    icone: TrendingUp,
    cor: 'bg-blue-100 text-blue-600',
  },
  {
    titulo: 'Alertas de Ruptura',
    descricao: 'Detecção automática de risco de ruptura de estoque com sugestão de ponto de reposição.',
    icone: AlertTriangle,
    cor: 'bg-amber-100 text-amber-600',
  },
  {
    titulo: 'Score CRM por IA',
    descricao: 'Scoring automático de leads e clientes usando machine learning para priorizar oportunidades.',
    icone: Brain,
    cor: 'bg-violet-100 text-violet-600',
  },
];

export default function InteligenciaArtificial() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inteligência Artificial</h1>
        <p className="text-muted-foreground">Análises preditivas e assistente inteligente</p>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <Sparkles className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-muted-foreground">Em breve</h2>
        <p className="text-sm text-muted-foreground mt-1">Módulo em desenvolvimento</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card key={feature.titulo} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-3">
              <div className={`rounded-lg p-2.5 w-fit ${feature.cor}`}>
                <feature.icone className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{feature.titulo}</h3>
              <p className="text-sm text-muted-foreground">{feature.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
