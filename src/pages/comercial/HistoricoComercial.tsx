import { useState, useMemo } from 'react';
import { Search, Phone, Mail, MapPin, Video, MessageCircle, FileText, RefreshCw, Headphones } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatarData } from '@/lib/formatters';
import { TIPOS_INTERACAO } from '@/lib/constants';

interface Interacao {
  id: string;
  data: string;
  tipo: string;
  cliente: string;
  assunto: string;
  resultado: string;
  vendedor: string;
}

const ICONE_TIPO: Record<string, React.ElementType> = {
  ligacao: Phone,
  email: Mail,
  visita: MapPin,
  reuniao_online: Video,
  whatsapp: MessageCircle,
  proposta_enviada: FileText,
  follow_up: RefreshCw,
  suporte: Headphones,
};

const COR_TIPO: Record<string, string> = {
  ligacao: 'bg-blue-100 text-blue-600',
  email: 'bg-green-100 text-green-600',
  visita: 'bg-purple-100 text-purple-600',
  reuniao_online: 'bg-orange-100 text-orange-600',
  whatsapp: 'bg-green-100 text-green-600',
  proposta_enviada: 'bg-yellow-100 text-yellow-600',
  follow_up: 'bg-gray-100 text-gray-600',
  suporte: 'bg-red-100 text-red-600',
};

const BADGE_TIPO: Record<string, string> = {
  ligacao: 'bg-blue-100 text-blue-800 border-blue-200',
  email: 'bg-green-100 text-green-800 border-green-200',
  visita: 'bg-purple-100 text-purple-800 border-purple-200',
  reuniao_online: 'bg-orange-100 text-orange-800 border-orange-200',
  whatsapp: 'bg-green-100 text-green-800 border-green-200',
  proposta_enviada: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  follow_up: 'bg-gray-100 text-gray-800 border-gray-200',
  suporte: 'bg-red-100 text-red-800 border-red-200',
};

const MOCK_INTERACOES: Interacao[] = [
  { id: '1', data: '2024-03-15', tipo: 'ligacao', cliente: 'BioGen Biotecnologia', assunto: 'Follow-up proposta HPLC', resultado: 'Cliente solicitou revisão de valores', vendedor: 'Carlos' },
  { id: '2', data: '2024-03-15', tipo: 'email', cliente: 'Farmacêutica Magnum', assunto: 'Envio de catálogo de dissolutores', resultado: 'Catálogo enviado, aguardando retorno', vendedor: 'Ana' },
  { id: '3', data: '2024-03-14', tipo: 'visita', cliente: 'LabCrom Análises', assunto: 'Demonstração de equipamentos GC', resultado: 'Interesse confirmado, cotação solicitada', vendedor: 'João' },
  { id: '4', data: '2024-03-14', tipo: 'reuniao_online', cliente: 'Instituto Biomédico', assunto: 'Apresentação kit microamostragem', resultado: 'Agendada visita técnica', vendedor: 'Ana' },
  { id: '5', data: '2024-03-13', tipo: 'whatsapp', cliente: 'Hospitais Unidos', assunto: 'Dúvidas sobre dispositivo Tasso M20', resultado: 'Informações técnicas enviadas', vendedor: 'Carlos' },
  { id: '6', data: '2024-03-13', tipo: 'proposta_enviada', cliente: 'Cromatografia & Cia', assunto: 'Proposta GC/MS QTEK', resultado: 'Proposta enviada por e-mail', vendedor: 'João' },
  { id: '7', data: '2024-03-12', tipo: 'follow_up', cliente: 'Química Analítica Ltda', assunto: 'Verificação de pedido de purificador', resultado: 'Pedido em processamento', vendedor: 'Carlos' },
  { id: '8', data: '2024-03-12', tipo: 'suporte', cliente: 'Universidade Federal', assunto: 'Suporte técnico colunas Luna', resultado: 'Problema resolvido por telefone', vendedor: 'Ana' },
  { id: '9', data: '2024-03-11', tipo: 'ligacao', cliente: 'Alimentos Bom Sabor', assunto: 'Cotação de pipetas Gilson', resultado: 'Cotação aprovada pelo gerente', vendedor: 'João' },
  { id: '10', data: '2024-03-10', tipo: 'email', cliente: 'NeoPharma Ltda', assunto: 'Proposta de manutenção preventiva', resultado: 'Aguardando aprovação da diretoria', vendedor: 'Carlos' },
];

export default function HistoricoComercial() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const interacoesFiltradas = useMemo(() => {
    return MOCK_INTERACOES
      .filter((i) => {
        const matchBusca =
          i.cliente.toLowerCase().includes(busca.toLowerCase()) ||
          i.assunto.toLowerCase().includes(busca.toLowerCase()) ||
          i.vendedor.toLowerCase().includes(busca.toLowerCase());
        const matchTipo = filtroTipo === 'todos' || i.tipo === filtroTipo;
        return matchBusca && matchTipo;
      })
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [busca, filtroTipo]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Histórico Comercial</h1>
        <p className="text-muted-foreground">Registro de interações com clientes</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente, assunto ou vendedor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {TIPOS_INTERACAO.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {interacoesFiltradas.map((interacao) => {
          const Icone = ICONE_TIPO[interacao.tipo] || FileText;
          const corIcone = COR_TIPO[interacao.tipo] || 'bg-gray-100 text-gray-600';
          const badgeTipo = BADGE_TIPO[interacao.tipo] || 'bg-gray-100 text-gray-800 border-gray-200';
          const tipoLabel = TIPOS_INTERACAO.find((t) => t.value === interacao.tipo)?.label ?? interacao.tipo;

          return (
            <Card key={interacao.id}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${corIcone}`}>
                  <Icone className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge variant="outline" className={badgeTipo}>{tipoLabel}</Badge>
                    <span className="text-xs text-muted-foreground">{formatarData(interacao.data)}</span>
                  </div>
                  <p className="font-medium">{interacao.cliente}</p>
                  <p className="text-sm">{interacao.assunto}</p>
                  <p className="text-sm text-muted-foreground">{interacao.resultado}</p>
                  <p className="text-xs text-muted-foreground mt-1">Vendedor: {interacao.vendedor}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}