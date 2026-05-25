import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Sparkles,
  MessagesSquare,
  CalendarDays,
  FolderOpen,
  Users,
  Package,
  ShoppingCart,
  Wrench,
  Heart,
  DollarSign,
  Megaphone,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SubItem {
  label: string;
  path: string;
}

interface MenuItem {
  label: string;
  icon: LucideIcon;
  path?: string;
  subItems?: SubItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Painel Executivo',
    icon: BarChart3,
    subItems: [
      { label: 'Visão Geral', path: '/' },
      { label: 'IA Preditiva', path: '/ia' },
    ],
  },
  { label: 'Inteligência Artificial', icon: Sparkles, path: '/ia' },
  { label: 'Chat Interno', icon: MessagesSquare, path: '/comunicacao' },
  { label: 'Agenda', icon: CalendarDays, path: '/agenda' },
  {
    label: 'Cadastros',
    icon: FolderOpen,
    subItems: [
      { label: 'Clientes', path: '/cadastros/clientes' },
      { label: 'Representadas', path: '/cadastros/representadas' },
      { label: 'Produtos', path: '/cadastros/produtos' },
      { label: 'Centros de Custo', path: '/cadastros/centros-custo' },
    ],
  },
  {
    label: 'Comercial',
    icon: Users,
    subItems: [
      { label: 'CRM', path: '/comercial/crm' },
      { label: 'Cotações', path: '/comercial/cotacoes' },
      { label: 'Propostas', path: '/comercial/propostas' },
      { label: 'Pedidos', path: '/comercial/pedidos' },
      { label: 'Histórico', path: '/comercial/historico' },
    ],
  },
  {
    label: 'Estoque & Logística',
    icon: Package,
    subItems: [
      { label: 'Inventário', path: '/estoque/inventario' },
      { label: 'Entradas', path: '/estoque/entradas' },
      { label: 'Saídas', path: '/estoque/saidas' },
      { label: 'Expedição', path: '/logistica/expedicao' },
    ],
  },
  {
    label: 'Compras',
    icon: ShoppingCart,
    subItems: [
      { label: 'Requisições', path: '/compras/requisicoes' },
      { label: 'Cotações Compra', path: '/compras/cotacoes' },
      { label: 'Pedidos', path: '/compras/pedidos' },
      { label: 'Rating', path: '/compras/rating' },
    ],
  },
  {
    label: 'Assistência Técnica',
    icon: Wrench,
    subItems: [
      { label: 'Ordens Serviço', path: '/assistencia/ordens' },
      { label: 'Agendamento', path: '/assistencia/agendamento' },
      { label: 'Equipamentos', path: '/assistencia/equipamentos' },
      { label: 'Validações', path: '/assistencia/validacoes' },
      { label: 'Histórico', path: '/assistencia/historico' },
    ],
  },
  {
    label: 'Saúde & Biotecnologia',
    icon: Heart,
    subItems: [
      { label: 'Produtos Saúde', path: '/saude/produtos' },
      { label: 'Dispositivos', path: '/saude/dispositivos' },
      { label: 'Microbiópsia', path: '/saude/microbiopsia' },
      { label: 'ANVISA', path: '/saude/anvisa' },
    ],
  },
  {
    label: 'Financeiro',
    icon: DollarSign,
    subItems: [
      { label: 'Contas Pagar', path: '/financeiro/contas-pagar' },
      { label: 'Contas Receber', path: '/financeiro/contas-receber' },
      { label: 'Fluxo Caixa', path: '/financeiro/fluxo-caixa' },
      { label: 'DRE', path: '/financeiro/dre' },
      { label: 'Margem', path: '/financeiro/margem' },
      { label: 'Comissões', path: '/financeiro/comissoes' },
    ],
  },
  {
    label: 'Marketing',
    icon: Megaphone,
    subItems: [
      { label: 'Dashboard', path: '/marketing/dashboard' },
      { label: 'Campanhas', path: '/marketing/campanhas' },
      { label: 'Conteúdo', path: '/marketing/conteudo' },
      { label: 'Leads', path: '/marketing/leads' },
      { label: 'Eventos', path: '/marketing/eventos' },
    ],
  },
  {
    label: 'RH & Governança',
    icon: Settings,
    subItems: [
      { label: 'Colaboradores', path: '/rh/colaboradores' },
      { label: 'Usuários', path: '/governanca/usuarios' },
      { label: 'Permissões', path: '/governanca/permissoes' },
      { label: 'Configurações', path: '/governanca/configuracoes' },
    ],
  },
];

interface MenuLateralProps {
  expandido: boolean;
  onToggleExpandido: () => void;
  mobileAberto: boolean;
  onMobileFechar: () => void;
}

function SidebarContent({
  expandido,
  onToggleExpandido,
  onNavigate,
}: {
  expandido: boolean;
  onToggleExpandido: () => void;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const [itensAbertos, setItensAbertos] = useState<Record<string, boolean>>({});

  const toggleItem = (label: string) => {
    if (!expandido) {
      onToggleExpandido();
      return;
    }
    setItensAbertos((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isParentActive = (item: MenuItem) => {
    if (item.path) return isActive(item.path);
    return item.subItems?.some((sub) => isActive(sub.path)) ?? false;
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Header with Logo */}
      <div className="relative px-4 py-5 border-b border-white/5">
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-violet-400 to-purple-500" />
        
        <div className="flex items-center gap-3">
          {expandido ? (
            <img src="/logo-allcrom.png" alt="Allcrom" className="h-7 w-auto object-contain" />
          ) : (
            <img src="/logo-small.png" alt="Allcrom" className="h-6 w-6 object-contain" />
          )}
          
          <button
            onClick={onToggleExpandido}
            className="ml-auto hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            {expandido ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const parentActive = isParentActive(item);
            const aberto = itensAbertos[item.label] ?? false;
            const Icon = item.icon;

            if (!item.subItems) {
              return (
                <NavLink
                  key={item.label}
                  to={item.path!}
                  end={item.path === '/'}
                  title={!expandido ? item.label : undefined}
                  onClick={onNavigate}
                  className={({ isActive: navActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      navActive || parentActive
                        ? 'bg-gradient-to-r from-violet-500/20 to-transparent text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )
                  }
                >
                  {({ isActive: navActive }) => (
                    <>
                      {navActive || parentActive ? (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-violet-400 to-purple-500" />
                      ) : null}
                      <div className={cn(
                        'p-1.5 rounded-lg transition-all duration-200',
                        navActive || parentActive
                          ? 'bg-violet-500/20 text-violet-400'
                          : 'group-hover:bg-white/10'
                      )}>
                        <Icon className="h-4 w-4 shrink-0" />
                      </div>
                      {expandido && <span className="truncate">{item.label}</span>}
                    </>
                  )}
                </NavLink>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleItem(item.label)}
                  title={!expandido ? item.label : undefined}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    parentActive
                      ? 'bg-gradient-to-r from-violet-500/20 to-transparent text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {parentActive ? (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-violet-400 to-purple-500" />
                  ) : null}
                  <div className={cn(
                    'p-1.5 rounded-lg transition-all duration-200',
                    parentActive
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'group-hover:bg-white/10'
                  )}>
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  {expandido && (
                    <>
                      <span className="truncate flex-1 text-left">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 transition-transform duration-200',
                          aberto && 'rotate-180'
                        )}
                      />
                    </>
                  )}
                </button>

                {expandido && aberto && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-4">
                    {item.subItems.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={onNavigate}
                        className={({ isActive: navActive }) =>
                          cn(
                            'group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200',
                            navActive || isActive(sub.path)
                              ? 'bg-violet-500/15 text-violet-300 font-medium'
                              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                          )
                        }
                      >
                        <div className={cn(
                          'h-1.5 w-1.5 rounded-full transition-colors',
                          isActive(sub.path) ? 'bg-violet-400' : 'bg-slate-600 group-hover:bg-slate-500'
                        )} />
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2">
          <div className="relative">
            <Avatar className="h-9 w-9 ring-2 ring-violet-500/50">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-semibold">
                VM
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-slate-900" />
          </div>
          
          {expandido && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Vitor Marques
              </p>
              <p className="text-xs text-slate-400 truncate">Administrador</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MenuLateral({
  expandido,
  onToggleExpandido,
  mobileAberto,
  onMobileFechar,
}: MenuLateralProps) {
  return (
    <>
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-out',
          expandido ? 'w-64' : 'w-[72px]'
        )}
      >
        <SidebarContent
          expandido={expandido}
          onToggleExpandido={onToggleExpandido}
        />
      </aside>

      {mobileAberto && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileFechar}
        />
      )}

      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 ease-out',
          mobileAberto ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent
          expandido={true}
          onToggleExpandido={onToggleExpandido}
          onNavigate={onMobileFechar}
        />
      </aside>
    </>
  );
}