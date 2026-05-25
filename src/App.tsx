import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/hooks/useAuth'
import { SegmentoProvider } from '@/contexts/SegmentoContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import LayoutPrincipal from '@/components/LayoutPrincipal'
import { Loader2 } from 'lucide-react'

const Login = lazy(() => import('@/pages/Login'))
const Index = lazy(() => import('@/pages/Index'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const InteligenciaArtificial = lazy(() => import('@/pages/InteligenciaArtificial'))
const Comunicacao = lazy(() => import('@/pages/Comunicacao'))
const Agenda = lazy(() => import('@/pages/Agenda'))
const Clientes = lazy(() => import('@/pages/cadastros/Clientes'))
const Produtos = lazy(() => import('@/pages/cadastros/Produtos'))
const Representadas = lazy(() => import('@/pages/cadastros/Representadas'))
const CentrosCusto = lazy(() => import('@/pages/cadastros/CentrosCusto'))
const CRM = lazy(() => import('@/pages/comercial/CRM'))
const Cotacoes = lazy(() => import('@/pages/comercial/Cotacoes'))
const Propostas = lazy(() => import('@/pages/comercial/Propostas'))
const PedidosVenda = lazy(() => import('@/pages/comercial/PedidosVenda'))
const HistoricoComercial = lazy(() => import('@/pages/comercial/HistoricoComercial'))
const Inventario = lazy(() => import('@/pages/estoque/Inventario'))
const Entradas = lazy(() => import('@/pages/estoque/Entradas'))
const Saidas = lazy(() => import('@/pages/estoque/Saidas'))
const Expedicao = lazy(() => import('@/pages/logistica/Expedicao'))
const Requisicoes = lazy(() => import('@/pages/compras/Requisicoes'))
const CotacoesCompra = lazy(() => import('@/pages/compras/CotacoesCompra'))
const PedidosCompra = lazy(() => import('@/pages/compras/PedidosCompra'))
const RatingFornecedores = lazy(() => import('@/pages/compras/RatingFornecedores'))
const OrdensServico = lazy(() => import('@/pages/assistencia/OrdensServico'))
const Agendamento = lazy(() => import('@/pages/assistencia/Agendamento'))
const EquipamentosManutencao = lazy(() => import('@/pages/assistencia/EquipamentosManutencao'))
const Validacoes = lazy(() => import('@/pages/assistencia/Validacoes'))
const HistoricoIntervencoes = lazy(() => import('@/pages/assistencia/HistoricoIntervencoes'))
const ProdutosSaude = lazy(() => import('@/pages/saude/ProdutosSaude'))
const DispositivosColeta = lazy(() => import('@/pages/saude/DispositivosColeta'))
const Microbiopsia = lazy(() => import('@/pages/saude/Microbiopsia'))
const RegistroANVISA = lazy(() => import('@/pages/saude/RegistroANVISA'))
const ContasPagar = lazy(() => import('@/pages/financeiro/ContasPagar'))
const ContasReceber = lazy(() => import('@/pages/financeiro/ContasReceber'))
const FluxoCaixa = lazy(() => import('@/pages/financeiro/FluxoCaixa'))
const DRE = lazy(() => import('@/pages/financeiro/DRE'))
const MargemProduto = lazy(() => import('@/pages/financeiro/MargemProduto'))
const Comissoes = lazy(() => import('@/pages/financeiro/Comissoes'))
const DashboardMarketing = lazy(() => import('@/pages/marketing/DashboardMarketing'))
const Campanhas = lazy(() => import('@/pages/marketing/Campanhas'))
const ConteudoBlog = lazy(() => import('@/pages/marketing/ConteudoBlog'))
const Leads = lazy(() => import('@/pages/marketing/Leads'))
const Eventos = lazy(() => import('@/pages/marketing/Eventos'))
const Colaboradores = lazy(() => import('@/pages/rh/Colaboradores'))
const Usuarios = lazy(() => import('@/pages/governanca/Usuarios'))
const Permissoes = lazy(() => import('@/pages/governanca/Permissoes'))
const Configuracoes = lazy(() => import('@/pages/governanca/Configuracoes'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function SuspenseFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SegmentoProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Suspense fallback={<SuspenseFallback />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute><LayoutPrincipal /></ProtectedRoute>}>
                  <Route path="/" element={<Index />} />
                  <Route path="/ia" element={<InteligenciaArtificial />} />
                  <Route path="/comunicacao" element={<Comunicacao />} />
                  <Route path="/agenda" element={<Agenda />} />
                  <Route path="/cadastros/clientes" element={<Clientes />} />
                  <Route path="/cadastros/produtos" element={<Produtos />} />
                  <Route path="/cadastros/representadas" element={<Representadas />} />
                  <Route path="/cadastros/centros-custo" element={<CentrosCusto />} />
                  <Route path="/comercial/crm" element={<CRM />} />
                  <Route path="/comercial/cotacoes" element={<Cotacoes />} />
                  <Route path="/comercial/propostas" element={<Propostas />} />
                  <Route path="/comercial/pedidos" element={<PedidosVenda />} />
                  <Route path="/comercial/historico" element={<HistoricoComercial />} />
                  <Route path="/estoque/inventario" element={<Inventario />} />
                  <Route path="/estoque/entradas" element={<Entradas />} />
                  <Route path="/estoque/saidas" element={<Saidas />} />
                  <Route path="/logistica/expedicao" element={<Expedicao />} />
                  <Route path="/compras/requisicoes" element={<Requisicoes />} />
                  <Route path="/compras/cotacoes" element={<CotacoesCompra />} />
                  <Route path="/compras/pedidos" element={<PedidosCompra />} />
                  <Route path="/compras/rating" element={<RatingFornecedores />} />
                  <Route path="/assistencia/ordens" element={<OrdensServico />} />
                  <Route path="/assistencia/agendamento" element={<Agendamento />} />
                  <Route path="/assistencia/equipamentos" element={<EquipamentosManutencao />} />
                  <Route path="/assistencia/validacoes" element={<Validacoes />} />
                  <Route path="/assistencia/historico" element={<HistoricoIntervencoes />} />
                  <Route path="/saude/produtos" element={<ProdutosSaude />} />
                  <Route path="/saude/dispositivos" element={<DispositivosColeta />} />
                  <Route path="/saude/microbiopsia" element={<Microbiopsia />} />
                  <Route path="/saude/anvisa" element={<RegistroANVISA />} />
                  <Route path="/financeiro/contas-pagar" element={<ContasPagar />} />
                  <Route path="/financeiro/contas-receber" element={<ContasReceber />} />
                  <Route path="/financeiro/fluxo-caixa" element={<FluxoCaixa />} />
                  <Route path="/financeiro/dre" element={<DRE />} />
                  <Route path="/financeiro/margem" element={<MargemProduto />} />
                  <Route path="/financeiro/comissoes" element={<Comissoes />} />
                  <Route path="/marketing/dashboard" element={<DashboardMarketing />} />
                  <Route path="/marketing/campanhas" element={<Campanhas />} />
                  <Route path="/marketing/conteudo" element={<ConteudoBlog />} />
                  <Route path="/marketing/leads" element={<Leads />} />
                  <Route path="/marketing/eventos" element={<Eventos />} />
                  <Route path="/rh/colaboradores" element={<Colaboradores />} />
                  <Route path="/governanca/usuarios" element={<Usuarios />} />
                  <Route path="/governanca/permissoes" element={<Permissoes />} />
                  <Route path="/governanca/configuracoes" element={<Configuracoes />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
              </Routes>
            </Suspense>
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
        </SegmentoProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
