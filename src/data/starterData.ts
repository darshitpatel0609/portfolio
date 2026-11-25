import type { WorkspaceItem } from '../types/app';

export const INITIAL_WORKSPACE_ITEMS: WorkspaceItem[] = [
  {
    id: 'item-1',
    title: 'Configure Tailwind v4 theme tokens',
    category: 'Styling',
    status: 'completed',
    updatedAt: 'Today, 09:15',
    notes: 'Defined Plus Jakarta Sans, DM Sans, JetBrains Mono, and class-based dark mode.',
  },
  {
    id: 'item-2',
    title: 'Connect client-side hash routing',
    category: 'Architecture',
    status: 'completed',
    updatedAt: 'Today, 09:42',
    notes: 'Synced Overview, Components, and Settings views with browser history.',
  },
  {
    id: 'item-3',
    title: 'Define API client and environment variables',
    category: 'Integration',
    status: 'active',
    updatedAt: 'Today, 10:18',
    notes: 'Add typed fetch helpers under src/lib/ when connecting external endpoints.',
  },
  {
    id: 'item-4',
    title: 'Review form validation primitives',
    category: 'UI Kit',
    status: 'review',
    updatedAt: 'Today, 11:05',
    notes: 'Verify focus rings, keyboard escape handling, and WCAG AA contrast in both themes.',
  },
  {
    id: 'item-5',
    title: 'Add route-level code splitting for large features',
    category: 'Performance',
    status: 'active',
    updatedAt: 'Today, 11:30',
    notes: 'Use React.lazy and Suspense as additional views grow beyond the starter shell.',
  },
];

export interface ArchitectureModule {
  path: string;
  layer: string;
  purpose: string;
}

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  {
    path: 'src/App.tsx',
    layer: 'Entry',
    purpose: 'Composes ThemeProvider, ToastProvider, AppShell, and route views',
  },
  {
    path: 'src/context/ThemeContext.tsx',
    layer: 'State',
    purpose: 'Persists light, dark, and system theme preferences synced to html.dark',
  },
  {
    path: 'src/context/ToastContext.tsx',
    layer: 'Feedback',
    purpose: 'Accessible live-region toast queue with timed dismissal',
  },
  {
    path: 'src/hooks/useHashRoute.ts',
    layer: 'Routing',
    purpose: 'Zero-dependency hash router with browser back/forward support',
  },
  {
    path: 'src/hooks/useLocalStorage.ts',
    layer: 'Persistence',
    purpose: 'Typed localStorage state hook with cross-tab synchronization',
  },
  {
    path: 'src/components/layout/AppShell.tsx',
    layer: 'Layout',
    purpose: 'Responsive sidebar navigation and contextual breadcrumb header',
  },
  {
    path: 'src/components/ui/*',
    layer: 'Primitives',
    purpose: 'Composable Button, Input, Modal, and EmptyState components',
  },
];
