import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </p>
      <p className="mt-1.5 max-w-md text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
