import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatarCNPJ, formatarTelefone } from '@/lib/formatters';
import { Building2, Settings, Link2, MessageSquare, Mail } from 'lucide-react';

export default function Configuracoes() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Parâmetros e configurações gerais do sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Dados da Empresa</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Razão Social</p>
              <p className="font-medium">Allcrom Comércio e Representações Ltda</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CNPJ</p>
              <p className="font-medium font-mono">{formatarCNPJ('02345678000190')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p className="font-medium">Rua Oscar Freire, 2078 - Jardins, São Paulo - SP</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CEP</p>
              <p className="font-medium font-mono">01426-002</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-medium">{formatarTelefone('1130885600')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">contato@allcrom.com.br</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Parâmetros do Sistema</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Prazo Validade Cotação</p>
              <p className="font-medium">15 dias</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estoque Mínimo Automático</p>
              <p className="font-medium">5 unidades (padrão)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Comissão Padrão</p>
              <p className="font-medium">3,5% sobre vendas</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prazo Padrão Entrega</p>
              <p className="font-medium">7 dias úteis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Integrações</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 rounded-lg p-2">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">WhatsApp Business</p>
                <p className="text-sm text-muted-foreground">API conectada - Notificações ativas</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Conectado</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Email (SMTP)</p>
                <p className="text-sm text-muted-foreground">smtp.allcrom.com.br - Porta 587</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Conectado</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
