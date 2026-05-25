import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  ShoppingCart,
  Wrench,
  Menu,
  BarChart3,
  Sparkles,
  MessagesSquare,
  CalendarDays,
  FolderOpen,
  Package,
  DollarSign,
  Megaphone,
  Heart,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', icon: Home, path: '/', end: true },
  { label: 'CRM', icon: Users, path: '/comercial/crm' },
  { label: 'Pedidos', icon: ShoppingCart, path: '/comercial/pedidos' },
  { label: 'Assistência', icon: Wrench, path: '/assistencia/ordens' },
];

const TODOS_MODULOS: NavItem[] = [
  { label: 'Painel', icon: BarChart3, path: '/' },
  { label: 'IA', icon: Sparkles, path: '/ia' },
  { label: 'Chat', icon: MessagesSquare, path: '/comunicacao' },
  { label: 'Agenda', icon: CalendarDays, path: '/agenda' },
  { label: 'Cadastros', icon: FolderOpen, path: '/cadastros/clientes' },
  { label: 'Comercial', icon: Users, path: '/comercial/crm' },
  { label: 'Estoque', icon: Package, path: '/estoque/inventario' },
  { label: 'Compras', icon: ShoppingCart, path: '/compras/requisicoes' },
  { label: 'Assistência', icon: Wrench, path: '/assistencia/ordens' },
  { label: 'Saúde', icon: Heart, path: '/saude/produtos' },
  { label: 'Financeiro', icon: DollarSign, path: '/financeiro/fluxo' },
  { label: 'Marketing', icon: Megaphone, path: '/marketing/dashboard' },
  { label: 'RH', icon: Settings, path: '/rh/colaboradores' },
];

export function BottomNav() {
  const [maisAberto, setMaisAberto] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex h-16 items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-1',
                  active ? 'text-violet-500' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </NavLink>
            );
          })}

          <Sheet open={maisAberto} onOpenChange={setMaisAberto}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center gap-1 px-3 py-1 text-muted-foreground">
                <Menu className="h-5 w-5" />
                <span className="text-[10px] font-medium">Mais</span>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Módulos</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {TODOS_MODULOS.map((modulo) => {
                    const Icon = modulo.icon;
                    return (
                      <NavLink
                        key={modulo.path + modulo.label}
                        to={modulo.path}
                        onClick={() => setMaisAberto(false)}
                        className={cn(
                          'flex flex-col items-center gap-2 rounded-lg p-3 transition-colors',
                          location.pathname.startsWith(modulo.path) &&
                            modulo.path !== '/'
                            ? 'bg-violet-50 text-violet-600'
                            : modulo.path === '/' &&
                              location.pathname === '/'
                              ? 'bg-violet-50 text-violet-600'
                              : 'text-muted-foreground hover:bg-accent'
                        )}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-xs font-medium text-center">
                          {modulo.label}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
