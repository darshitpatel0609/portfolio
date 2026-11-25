import { useMemo, useState } from 'react';
import { Check, Copy, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../context/ToastContext';
import { ARCHITECTURE_MODULES } from '../data/starterData';
import type { DensityMode, WorkspaceItem, WorkspaceItemStatus } from '../types/app';

interface OverviewPageProps {
  items: WorkspaceItem[];
  density: DensityMode;
  onOpenNewItem: () => void;
  onCycleStatus: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

type StatusFilter = 'all' | WorkspaceItemStatus;

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'review', label: 'In Review' },
  { id: 'completed', label: 'Completed' },
];

const STATUS_META: Record<
  WorkspaceItemStatus,
  { label: string; textClass: string }
> = {
  active: {
    label: 'Active',
    textClass: 'text-blue-700 dark:text-blue-400',
  },
  review: {
    label: 'In Review',
    textClass: 'text-amber-700 dark:text-amber-400',
  },
  completed: {
    label: 'Completed',
    textClass: 'text-emerald-700 dark:text-emerald-400',
  },
};

export function OverviewPage({
  items,
  density,
  onOpenNewItem,
  onCycleStatus,
  onDeleteItem,
}: OverviewPageProps) {
  const { pushToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const counts = useMemo(() => {
    const active = items.filter((item) => item.status === 'active').length;
    const review = items.filter((item) => item.status === 'review').length;
    const completed = items.filter((item) => item.status === 'completed').length;
    return { total: items.length, active, review, completed };
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      if (!normalized) return true;
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized) ||
        item.notes.toLowerCase().includes(normalized)
      );
    });
  }, [items, searchQuery, statusFilter]);

  const handleCopyPath = async (filePath: string) => {
    try {
      await navigator.clipboard.writeText(filePath);
      setCopiedPath(filePath);
      pushToast({
        title: 'Copied path',
        description: filePath,
        variant: 'info',
      });
      window.setTimeout(() => {
        setCopiedPath((current) => (current === filePath ? null : current));
      }, 1500);
    } catch {
      pushToast({
        title: 'Clipboard unavailable',
        description: filePath,
        variant: 'warning',
      });
    }
  };

  const rowPadding = density === 'compact' ? 'py-2.5' : 'py-3.5';

  return (
    <div className="space-y-8">
      {/* Page Intro */}
      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Vite 8</span>
          <span aria-hidden="true">·</span>
          <span>React 19</span>
          <span aria-hidden="true">·</span>
          <span>TypeScript</span>
          <span aria-hidden="true">·</span>
          <span>Tailwind CSS v4</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          Application Base
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A clean starter foundation with client-side routing, light and dark theme
          persistence, reusable UI primitives, and local state management ready for
          feature development.
        </p>
      </section>

      {/* Summary Metrics Strip */}
      <section
        aria-label="Workspace summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total Items
          </p>
          <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {counts.total}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Persisted in browser storage
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Open Work
          </p>
          <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {counts.active + counts.review}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {counts.active} active · {counts.review} in review
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Completed
          </p>
          <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {counts.completed}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {counts.total > 0
              ? `${Math.round((counts.completed / counts.total) * 100)}% of starter checklist`
              : 'No items tracked yet'}
          </p>
        </div>
      </section>

      {/* Interactive Starter Records Table */}
      <section
        aria-labelledby="starter-items-heading"
        className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
          <div>
            <h2
              id="starter-items-heading"
              className="text-base font-semibold text-slate-900 dark:text-slate-100"
            >
              Starter Checklist
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Click a status label to advance its state, or add and filter records below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search items..."
                aria-label="Search checklist items"
                className="min-h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            <div
              role="group"
              aria-label="Filter by status"
              className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800"
            >
              {STATUS_FILTERS.map((tab) => {
                const selected = statusFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    aria-pressed={selected}
                    className={`cursor-pointer whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-blue-600 ${
                      selected
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPreviewLoading((prev) => !prev)}
            >
              {previewLoading ? 'Show Data' : 'Loading State'}
            </Button>
          </div>
        </div>

        {previewLoading ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-800" aria-busy="true">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-4 px-6 ${rowPadding}`}
              >
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-80 animate-pulse rounded bg-slate-100 dark:bg-slate-800/70" />
                </div>
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800/70" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            title={items.length === 0 ? 'No items in this workspace' : 'No matching items'}
            description={
              items.length === 0
                ? 'Create your first record to verify state persistence and table controls.'
                : 'Try adjusting your search query or switching the active status filter.'
            }
            action={
              items.length === 0 ? (
                <Button size="sm" onClick={onOpenNewItem}>
                  <Plus className="h-4 w-4" />
                  <span>Add First Item</span>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
                  <th className="px-6 py-3 font-medium">Item</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Updated</th>
                  <th className="px-6 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredItems.map((item) => {
                  const statusMeta = STATUS_META[item.status];
                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <td className={`px-6 ${rowPadding}`}>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {item.title}
                        </p>
                        {item.notes && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                            {item.notes}
                          </p>
                        )}
                      </td>
                      <td
                        className={`whitespace-nowrap px-4 text-xs text-slate-600 dark:text-slate-400 ${rowPadding}`}
                      >
                        {item.category}
                      </td>
                      <td className={`whitespace-nowrap px-4 ${rowPadding}`}>
                        <button
                          type="button"
                          onClick={() => onCycleStatus(item.id)}
                          title="Click to cycle status"
                          className={`cursor-pointer whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600 dark:hover:bg-slate-800 ${statusMeta.textClass}`}
                        >
                          {statusMeta.label}
                        </button>
                      </td>
                      <td
                        className={`whitespace-nowrap px-4 text-right font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400 ${rowPadding}`}
                      >
                        {item.updatedAt}
                      </td>
                      <td className={`whitespace-nowrap px-6 text-right ${rowPadding}`}>
                        <button
                          type="button"
                          onClick={() => onDeleteItem(item.id)}
                          aria-label={`Delete ${item.title}`}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-blue-600 dark:hover:bg-slate-800 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Project Architecture Directory */}
      <section
        aria-labelledby="architecture-heading"
        className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <h2
            id="architecture-heading"
            className="text-base font-semibold text-slate-900 dark:text-slate-100"
          >
            Starter Architecture
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Core files included in this Vite base. Copy any file path to jump directly in your editor.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
                <th className="px-6 py-3 font-medium">Module Path</th>
                <th className="px-4 py-3 font-medium">Layer</th>
                <th className="px-4 py-3 font-medium">Responsibility</th>
                <th className="px-6 py-3 text-right font-medium">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {ARCHITECTURE_MODULES.map((mod) => {
                const isCopied = copiedPath === mod.path;
                return (
                  <tr
                    key={mod.path}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="whitespace-nowrap px-6 py-3 font-mono text-xs text-slate-900 dark:text-slate-100">
                      {mod.path}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                      {mod.layer}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                      {mod.purpose}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyPath(mod.path)}
                        aria-label={`Copy ${mod.path}`}
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
