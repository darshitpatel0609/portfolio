import { useState, type ReactNode } from 'react';
import {
  LayoutGrid,
  Layers,
  Menu,
  Moon,
  Plus,
  Settings,
  Sun,
  X,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { RouteId } from '../../types/app';
import { Button } from '../ui/Button';

interface AppShellProps {
  route: RouteId;
  onNavigate: (route: RouteId) => void;
  onOpenNewItem: () => void;
  children: ReactNode;
}

interface NavItem {
  id: RouteId;
  label: string;
  icon: typeof LayoutGrid;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'components', label: 'Components', icon: Layers },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const ROUTE_TITLES: Record<RouteId, string> = {
  overview: 'Overview',
  components: 'Components',
  settings: 'Settings',
};

export function AppShell({
  route,
  onNavigate,
  onOpenNewItem,
  children,
}: AppShellProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectRoute = (next: RouteId) => {
    onNavigate(next);
    setMobileMenuOpen(false);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-white dark:bg-slate-900">
      <div>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
          <button
            type="button"
            onClick={() => handleSelectRoute('overview')}
            className="cursor-pointer whitespace-nowrap font-display text-lg font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-100"
          >
            ViteBase
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Primary navigation" className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = route === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectRoute(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-10 w-full cursor-pointer items-center gap-3 whitespace-nowrap rounded-lg px-3.5 py-2 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-2.5">
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4 shrink-0 text-slate-400" />
            ) : (
              <Moon className="h-4 w-4 shrink-0 text-slate-500" />
            )}
            <span>{resolvedTheme === 'dark' ? 'Light theme' : 'Dark theme'}</span>
          </span>
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
            {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden w-[248px] shrink-0 border-r border-slate-200 lg:block dark:border-slate-800">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex bg-slate-950/50 lg:hidden"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setMobileMenuOpen(false);
            }
          }}
        >
          <div className="h-full w-[264px] border-r border-slate-200 dark:border-slate-800">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-6 border-b border-slate-200 bg-white/95 px-6 backdrop-blur-xs lg:px-8 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
            >
              <span className="truncate whitespace-nowrap">Workspace</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                /
              </span>
              <span className="truncate whitespace-nowrap font-medium text-slate-900 dark:text-slate-100">
                {ROUTE_TITLES[route]}
              </span>
            </nav>
          </div>

          <Button size="sm" onClick={onOpenNewItem}>
            <Plus className="h-4 w-4 shrink-0" />
            <span>New Item</span>
          </Button>
        </header>

        <main className="mx-auto w-full max-w-[1160px] flex-1 px-6 py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
