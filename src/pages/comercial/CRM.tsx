import { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Search, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatarMoeda } from '@/lib/formatters';

interface Oportunidade {
  id: string;
  titulo: string;
  cliente: string;
  valor: number;
  probabilidade: number;
  vendedor: string;
  etapa: 'prospeccao' | 'qualificacao' | 'proposta' | 'negociacao' | 'fechamento';
  proximaAcao: string;
  segmento: string;
}

const ETAPAS = [
  { id: 'prospeccao', nome: 'Prospecção', cor: 'bg-blue-500' },
  { id: 'qualificacao', nome: 'Qualificação', cor: 'bg-yellow-500' },
  { id: 'proposta', nome: 'Proposta', cor: 'bg-purple-500' },
  { id: 'negociacao', nome: 'Negociação', cor: 'bg-orange-500' },
  { id: 'fechamento', nome: 'Fechamento', cor: 'bg-green-500' },
] as const;

const MOCK_OPORTUNIDADES: Oportunidade[] = [
  { id: '1', titulo: 'Upgrade HPLC BioGen', cliente: 'BioGen Biotecnologia', valor: 350000, probabilidade: 20, vendedor: 'Carlos', etapa: 'prospeccao', proximaAcao: 'Agendar ligação com decisor', segmento: 'cromatografia' },
  { id: '2', titulo: 'Dissolutor Farmácia Magnum', cliente: 'Farmacêutica Magnum', valor: 28000, probabilidade: 15, vendedor: 'Ana', etapa: 'prospeccao', proximaAcao: 'Enviar catálogo técnico', segmento: 'cromatografia' },
  { id: '3', titulo: 'Colunas SPE LabCrom', cliente: 'LabCrom Análises', valor: 8500, probabilidade: 40, vendedor: 'João', etapa: 'qualificacao', proximaAcao: 'Confirmar especificações', segmento: 'cromatografia' },
  { id: '4', titulo: 'Purificador Química Analítica', cliente: 'Química Analítica Ltda', valor: 5200, probabilidade: 50, vendedor: 'Carlos', etapa: 'qualificacao', proximaAcao: 'Enviar amostra grátis', segmento: 'cromatografia' },
  { id: '5', titulo: 'Kit Microamostragem Instituto', cliente: 'Instituto Biomédico', valor: 42000, probabilidade: 35, vendedor: 'Ana', etapa: 'qualificacao', proximaAcao: 'Reunião com gerente de compras', segmento: 'biotecnologia' },
  { id: '6', titulo: 'GC/MS QTEK Cromatografia&Cia', cliente: 'Cromatografia & Cia', valor: 520000, probabilidade: 60, vendedor: 'Carlos', etapa: 'proposta', proximaAcao: 'Revisar proposta comercial', segmento: 'cromatografia' },
  { id: '7', titulo: 'Tasso M20 Hospitais Unidos', cliente: 'Hospitais Unidos', valor: 68000, probabilidade: 65, vendedor: 'Ana', etapa: 'proposta', proximaAcao: 'Agendar apresentação', segmento: 'saude' },
  { id: '8', titulo: 'Freezer -86 Meling Unifed', cliente: 'Unifed', valor: 15600, probabilidade: 70, vendedor: 'João', etapa: 'negociacao', proximaAcao: 'Negociar prazo de entrega', segmento: 'biotecnologia' },
  { id: '9', titulo: 'Pipetas Gilson Alimentos', cliente: 'Alimentos Bom Sabor', valor: 12400, probabilidade: 75, vendedor: 'Carlos', etapa: 'negociacao', proximaAcao: 'Enviar contratos para assinatura', segmento: 'cromatografia' },
  { id: '10', titulo: 'CAMAG Scanner Lab Pesquisa', cliente: 'Lab Pesquisa', valor: 200000, probabilidade: 55, vendedor: 'Ana', etapa: 'negociacao', proximaAcao: 'Alinhar condições de pagamento', segmento: 'cromatografia' },
  { id: '11', titulo: 'Manutenção Preventiva IQN', cliente: 'Instituto Quality Nacional', valor: 8500, probabilidade: 90, vendedor: 'João', etapa: 'fechamento', proximaAcao: 'Confirmar data de instalação', segmento: 'cromatografia' },
  { id: '12', titulo: 'Centrífuga Scilogex Biotech', cliente: 'BioTech Solutions', valor: 9600, probabilidade: 85, vendedor: 'Carlos', etapa: 'fechamento', proximaAcao: 'Coletar documentos fiscais', segmento: 'biotecnologia' },
  { id: '13', titulo: 'Colunas Luna Phenomenex', cliente: 'PharmaLab', valor: 15000, probabilidade: 10, vendedor: 'Ana', etapa: 'prospeccao', proximaAcao: 'Identificar responsável de compras', segmento: 'cromatografia' },
  { id: '14', titulo: 'Seringas Hamilton Lab', cliente: 'Hamilton Lab', valor: 3200, probabilidade: 45, vendedor: 'João', etapa: 'qualificacao', proximaAcao: 'Solicitar cotação do fornecedor', segmento: 'cromatografia' },
  { id: '15', titulo: 'Mitra VAMS Hospital', cliente: 'Hospital Central', valor: 28000, probabilidade: 55, vendedor: 'Ana', etapa: 'proposta', proximaAcao: 'Aguardar retorno do cliente', segmento: 'saude' },
];

function badgeProbabilidade(prob: number) {
  if (prob >= 70) return 'bg-green-100 text-green-800 border-green-200';
  if (prob >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200';
}

export default function CRM() {
  const [oportunidades, setOportunidades] = useState(MOCK_OPORTUNIDADES);
  const [busca, setBusca] = useState('');

  const totalPipeline = useMemo(() => oportunidades.reduce((acc, o) => acc + o.valor, 0), [oportunidades]);
  const totalOportunidades = oportunidades.length;
  const taxaConversao = 34;

  const oportunidadesFiltradas = useMemo(() => {
    if (!busca) return oportunidades;
    return oportunidades.filter(
      (o) =>
        o.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        o.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        o.vendedor.toLowerCase().includes(busca.toLowerCase())
    );
  }, [oportunidades, busca]);

  function handleDragEnd(result: any) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    setOportunidades((prev) =>
      prev.map((o) =>
        o.id === draggableId ? { ...o, etapa: destination.droppableId as Oportunidade['etapa'] } : o
      )
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CRM Pipeline</h1>
        <p className="text-muted-foreground">Gestão de oportunidades comerciais</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="flex items-center gap-2 p-3 sm:p-4">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-lg font-bold truncate">{formatarMoeda(totalPipeline)}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Total Pipeline</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-2 p-3 sm:p-4">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-lg font-bold">{totalOportunidades}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Oportunidades</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-2 p-3 sm:p-4">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-lg font-bold">{taxaConversao}%</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Taxa Conversão</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar oportunidade, cliente ou vendedor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {ETAPAS.map((etapa) => {
            const items = oportunidadesFiltradas.filter((o) => o.etapa === etapa.id);
            return (
              <div key={etapa.id} className="min-w-[280px] flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-3 w-3 rounded-full ${etapa.cor}`} />
                  <h3 className="font-semibold text-sm">{etapa.nome}</h3>
                  <Badge variant="secondary" className="text-xs">{items.length}</Badge>
                </div>
                <Droppable droppableId={etapa.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2 min-h-[120px] rounded-lg bg-muted/50 p-2"
                    >
                      {items.map((oportunidade, index) => (
                        <Draggable key={oportunidade.id} draggableId={oportunidade.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="rounded-lg border bg-card p-2 sm:p-3 shadow-sm"
                            >
                              <div className="flex items-start justify-between gap-2 min-w-0">
                                <p className="font-medium text-xs sm:text-sm leading-tight truncate min-w-0">{oportunidade.titulo}</p>
                                <Badge variant="outline" className={badgeProbabilidade(oportunidade.probabilidade)}>
                                  {oportunidade.probabilidade}%
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 truncate">{oportunidade.cliente}</p>
                              <p className="font-semibold text-xs sm:text-sm mt-1 truncate">{formatarMoeda(oportunidade.valor)}</p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">{oportunidade.vendedor}</p>
                              <p className="text-[10px] sm:text-xs mt-1 line-clamp-2">{oportunidade.proximaAcao}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}