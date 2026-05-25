import { Heart, Microscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ProdutoMicrobiopsia {
  id: string;
  nome: string;
  fabricante: string;
  descricao: string;
  registroANVISA: string;
  statusRegistro: 'ativo' | 'em_renovacao';
  specs: { label: string; value: string }[];
}

const MOCK_PRODUTO: ProdutoMicrobiopsia = {
  id: '1',
  nome: 'Harpera Microbiópsia',
  fabricante: 'Hologic Inc.',
  descricao: 'Dispositivo descartável para biópsia endometrial em ambiente ambulatorial. Procedimento rápido e minimamente invasivo, sem necessidade de anestesia. Ideal para diagnóstico de patologias endometriais e monitoramento hormonal.',
  registroANVISA: 'MS/8097.6540001',
  statusRegistro: 'em_renovacao',
  specs: [
    { label: 'Tipo de Procedimento', value: 'Biópsia Endometrial' },
    { label: 'Duração do Procedimento', value: '~5 minutos' },
    { label: 'Anestesia', value: 'Não necessária' },
    { label: 'Descartável', value: 'Sim (uso único)' },
    { label: 'Comprimento', value: '23 cm' },
    { label: 'Diâmetro', value: '3 mm' },
    { label: 'Mecanismo', value: 'Aspiração manual' },
    { label: 'Certificação', value: 'CE Mark, FDA 510(k)' },
  ],
};

const STATUS_CONFIG = {
  ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  em_renovacao: { label: 'Em Renovação', className: 'bg-amber-100 text-amber-800 border-amber-200' },
};

export default function Microbiopsia() {
  const p = MOCK_PRODUTO;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
          <Microscope className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Microbiópsia</h1>
            <Badge className="bg-emerald-600 hover:bg-emerald-700">
              <Heart className="h-3 w-3 mr-1" />
              Allcrom Saúde
            </Badge>
          </div>
          <p className="text-muted-foreground">Dispositivos para biópsia e microbiópsia</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                <Microscope className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl">{p.nome}</CardTitle>
                <CardDescription>{p.fabricante}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className={STATUS_CONFIG[p.statusRegistro].className}>
              {STATUS_CONFIG[p.statusRegistro].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">{p.descricao}</p>

          <Separator />

          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Especificações Técnicas</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {p.specs.map((spec) => (
                <div key={spec.label} className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="text-sm font-medium mt-1">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-xs text-muted-foreground">Registro ANVISA</p>
              <p className="font-mono font-medium">{p.registroANVISA}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge variant="outline" className={STATUS_CONFIG[p.statusRegistro].className}>
                {STATUS_CONFIG[p.statusRegistro].label}
              </Badge>
            </div>
          </div>

          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
            <p className="text-sm text-emerald-800">
              <strong>Aplicações clínicas:</strong> Investigação de sangramento uterino anormal, diagnóstico de hiperplasia endometrial, monitoramento de terapia hormonal, rastreamento de câncer endometrial em pacientes de alto risco.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
