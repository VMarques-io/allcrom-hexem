import { useState, useEffect } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SeletorSegmento } from './SeletorSegmento';
import { NotificacoesDropdown } from './NotificacoesDropdown';
import { cn } from '@/lib/utils';

interface CabecalhoPrincipalProps {
  onMenuToggle: () => void;
}

export function CabecalhoPrincipal({ onMenuToggle }: CabecalhoPrincipalProps) {
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [dataHora, setDataHora] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDataHora(new Date()), 60000);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dataFormatada = dataHora.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-16 items-center justify-between px-4 lg:px-6 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'bg-white border-b border-gray-100'
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <SeletorSegmento />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:block relative">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar módulos, clientes..."
              className="h-9 w-64 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 transition-all"
            />
          </div>
        </div>

        {/* Mobile search toggle */}
        <div className="md:hidden">
          {buscaAberta ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Buscar..."
                className="h-9 w-44 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => setBuscaAberta(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-600"
              onClick={() => setBuscaAberta(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Notifications */}
        <NotificacoesDropdown />

        {/* Date/Time */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium">
            {dataFormatada} · {horaFormatada}
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2.5 ml-1 pl-2 border-l border-gray-200">
          <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-semibold">
              VM
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-slate-900 leading-none">Vitor Marques</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
}