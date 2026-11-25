import { useState } from 'react';
import { Download, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import type { DensityMode, ThemePreference, WorkspaceItem } from '../types/app';

interface SettingsPageProps {
  density: DensityMode;
  onChangeDensity: (next: DensityMode) => void;
  items: WorkspaceItem[];
  onResetItems: () => void;
  onClearItems: () => void;
}

const THEME_OPTIONS: { id: ThemePreference; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
];

const DENSITY_OPTIONS: { id: DensityMode; label: string }[] = [
  { id: 'comfortable', label: 'Comfortable' },
  { id: 'compact', label: 'Compact' },
];

export function SettingsPage({
  density,
  onChangeDensity,
  items,
  onResetItems,
  onClearItems,
}: SettingsPageProps) {
  const { preference, resolvedTheme, setPreference } = useTheme();
  const { pushToast } = useToast();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleExportJson = () => {
    const payload = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        itemCount: items.length,
        items,
      },
      null,
      2
    );
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'vitebase-workspace.json';
    anchor.click();
    URL.revokeObjectURL(url);

    pushToast({
      title: 'Workspace exported',
      description: `Downloaded ${items.length} item${items.length === 1 ? '' : 's'} as JSON.`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Workspace Preferences · Local Storage
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          Settings
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Adjust theme behavior, table spacing, and local workspace data. All
          preferences persist across sessions.
        </p>
      </section>

      {/* Appearance & Layout */}
      <section className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Appearance
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Currently rendering in {resolvedTheme} mode.
            </p>
          </div>
          <div
            role="group"
            aria-label="Theme preference"
            className="flex items-center gap-1 self-start rounded-lg bg-slate-100 p-1 sm:self-auto dark:bg-slate-800"
          >
            {THEME_OPTIONS.map((option) => {
              const selected = preference === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setPreference(option.id);
                    pushToast({
                      title: `Theme set to ${option.label}`,
                      variant: 'info',
                    });
                  }}
                  aria-pressed={selected}
                  className={`cursor-pointer whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-blue-600 ${
                    selected
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Table Density
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Controls vertical row padding across checklist and data tables.
            </p>
          </div>
          <div
            role="group"
            aria-label="Table density"
            className="flex items-center gap-1 self-start rounded-lg bg-slate-100 p-1 sm:self-auto dark:bg-slate-800"
          >
            {DENSITY_OPTIONS.map((option) => {
              const selected = density === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChangeDensity(option.id);
                    pushToast({
                      title: `Density set to ${option.label}`,
                      variant: 'info',
                    });
                  }}
                  aria-pressed={selected}
                  className={`cursor-pointer whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-blue-600 ${
                    selected
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workspace Data Controls */}
      <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Local Storage Data
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Export, restore defaults, or clear the{' '}
            <span className="font-mono tabular-nums">{items.length}</span> stored
            starter record{items.length === 1 ? '' : 's'}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 px-6 py-5">
          <Button variant="secondary" size="sm" onClick={handleExportJson}>
            <Download className="h-4 w-4 shrink-0" />
            <span>Export JSON</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onResetItems();
              pushToast({
                title: 'Sample items restored',
                variant: 'success',
              });
            }}
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            <span>Restore Defaults</span>
          </Button>
          <Button
            variant="danger"
            size="sm"
            disabled={items.length === 0}
            onClick={() => setConfirmClearOpen(true)}
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            <span>Clear All Items</span>
          </Button>
        </div>
      </section>

      <Modal
        open={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear all workspace items?"
        description="This removes all saved items from browser storage. You can restore defaults anytime."
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmClearOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onClearItems();
                setConfirmClearOpen(false);
                pushToast({
                  title: 'Workspace cleared',
                  variant: 'info',
                });
              }}
            >
              Clear All
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Currently storing{' '}
          <span className="font-mono font-medium tabular-nums text-slate-900 dark:text-slate-100">
            {items.length}
          </span>{' '}
          record{items.length === 1 ? '' : 's'}.
        </p>
      </Modal>
    </div>
  );
}
