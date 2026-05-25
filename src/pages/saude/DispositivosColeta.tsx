import { Heart, Droplets, Beaker } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface DispositivoColeta {
  id: string;
  nome: string;
  fabricante: string;
  descricao: string;
  registroANVISA: string;
  statusRegistro: 'ativo' | 'em_renovacao' | 'em_analise';
  specs: { label: string; value: string }[];
  segmento: string;
  icone: 'droplet' | 'beaker';
}

const MOCK_DISPOSITIVOS: DispositivoColeta[] = [
  {
    id: '1',
    nome: 'Tasso M20',
    fabricante: 'Tasso Inc.',
    descricao: 'Dispositivo de coleta de sangue capilar para microamostragem. Design inovador com ativação por um toque, ideal para coleta domiciliar e estudos clínicos. Volume de amostra de até 750μL.',
    registroANVISA: 'MS/8058.4310001',
    statusRegistro: 'ativo',
    specs: [
      { label: 'Volume de Coleta', value: 'Até 750μL' },
      { label: 'Tipo de Amostra', value: 'Sangue Capilar' },
      { label: 'Ativação', value: 'Um toque' },
      { label: 'Dor Estimada', value: 'Mínima' },
      { label: 'Aplicação', value: 'Coleta domiciliar, estudos clínicos' },
    ],
    segmento: 'saude',
    icone: 'droplet',
  },
  {
    id: '2',
    nome: 'Tasso S17',
    fabricante: 'Tasso Inc.',
    descricao: 'Dispositivo de coleta de sangue capilar compacto para microamostragem. Versão menor do Tasso M20, coleta de até 250μL. Ideal para pediatria e coletas de menor volume.',
    registroANVISA: 'MS/8058.4310002',
    statusRegistro: 'ativo',
    specs: [
      { label: 'Volume de Coleta', value: 'Até 250μL' },
      { label: 'Tipo de Amostra', value: 'Sangue Capilar' },
      { label: 'Ativação', value: 'Um toque' },
      { label: 'Dor Estimada', value: 'Mínima' },
      { label: 'Aplicação', value: 'Pediatria, coletas de menor volume' },
    ],
    segmento: 'saude',
    icone: 'droplet',
  },
  {
    id: '3',
    nome: 'Mitra VAMS 30μL',
    fabricante: 'Neoteryx LLC',
    descricao: 'Dispositivo de microamostragem VAMS (Volumetric Absorptive Microsampling). Coleta volumétrica precisa de 30μL de sangue. Amostra seca estável em temperatura ambiente.',
    registroANVISA: 'MS/8146.8930001',
    statusRegistro: 'ativo',
    specs: [
      { label: 'Volume de Coleta', value: '30μL (preciso)' },
      { label: 'Tecnologia', value: 'VAMS' },
      { label: 'Tipo de Amostra', value: 'Sangue Capilar' },
      { label: 'Estabilidade', value: 'Temperatura ambiente' },
      { label: 'Aplicação', value: 'TK/PK, monitoramento terapêutico' },
    ],
    segmento: 'saude',
    icone: 'beaker',
  },
  {
    id: '4',
    nome: 'Mitra VAMS 10μL',
    fabricante: 'Neoteryx LLC',
    descricao: 'Versão mini do Mitra VAMS para coleta volumétrica de 10μL. Ideal para estudos com restrição de volume como pediatria e estudos com animais.',
    registroANVISA: 'MS/8146.8930002',
    statusRegistro: 'ativo',
    specs: [
      { label: 'Volume de Coleta', value: '10μL (preciso)' },
      { label: 'Tecnologia', value: 'VAMS' },
      { label: 'Tipo de Amostra', value: 'Sangue Capilar' },
      { label: 'Estabilidade', value: 'Temperatura ambiente' },
      { label: 'Aplicação', value: 'Pediatria, estudos pré-clínicos' },
    ],
    segmento: 'saude',
    icone: 'beaker',
  },
];

const STATUS_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  em_renovacao: { label: 'Em Renovação', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  em_analise: { label: 'Em Análise', className: 'bg-blue-100 text-blue-800 border-blue-200' },
};

export default function DispositivosColeta() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
          <Droplets className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Dispositivos de Coleta</h1>
            <Badge className="bg-emerald-600 hover:bg-emerald-700">
              <Heart className="h-3 w-3 mr-1" />
              Allcrom Saúde
            </Badge>
          </div>
          <p className="text-muted-foreground">Dispositivos para microamostragem e coleta de sangue capilar</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MOCK_DISPOSITIVOS.map((d) => (
          <Card key={d.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                    {d.icone === 'droplet' ? (
                      <Droplets className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Beaker className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{d.nome}</CardTitle>
                    <CardDescription>{d.fabricante}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={STATUS_CONFIG[d.statusRegistro].className}>
                  {STATUS_CONFIG[d.statusRegistro].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{d.descricao}</p>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Especificações</p>
                <div className="grid grid-cols-2 gap-2">
                  {d.specs.map((spec) => (
                    <div key={spec.label} className="text-sm">
                      <span className="text-muted-foreground">{spec.label}:</span>{' '}
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="text-xs text-muted-foreground">
                Registro ANVISA: <span className="font-mono font-medium">{d.registroANVISA}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
