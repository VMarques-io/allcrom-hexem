import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MenuLateral } from './MenuLateral';
import { CabecalhoPrincipal } from './CabecalhoPrincipal';
import { BottomNav } from './BottomNav';

export default function LayoutPrincipal() {
  const [sidebarExpandido, setSidebarExpandido] = useState(true);
  const [mobileAberto, setMobileAberto] = useState(false);

  const toggleSidebar = () => setSidebarExpandido((prev) => !prev);
  const toggleMobile = () => setMobileAberto((prev) => !prev);
  const fecharMobile = () => setMobileAberto(false);

  return (
    <div className="min-h-screen bg-background">
      <MenuLateral
        expandido={sidebarExpandido}
        onToggleExpandido={toggleSidebar}
        mobileAberto={mobileAberto}
        onMobileFechar={fecharMobile}
      />

      <div
        className={cn(
          'min-h-screen transition-all duration-300',
          sidebarExpandido ? 'lg:pl-64' : 'lg:pl-16'
        )}
      >
        <CabecalhoPrincipal onMenuToggle={toggleMobile} />
        <main className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
