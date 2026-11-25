export type RouteId = 'overview' | 'components' | 'settings';

export type ThemePreference = 'light' | 'dark' | 'system';

export type DensityMode = 'comfortable' | 'compact';

export type WorkspaceItemStatus = 'active' | 'review' | 'completed';

export interface WorkspaceItem {
  id: string;
  title: string;
  category: string;
  status: WorkspaceItemStatus;
  updatedAt: string;
  notes: string;
}

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}
