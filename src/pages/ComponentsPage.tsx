import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

export function ComponentsPage() {
  const { pushToast } = useToast();
  const [clickCount, setClickCount] = useState(0);
  const [sampleName, setSampleName] = useState('Acme Starter');
  const [sampleEmail, setSampleEmail] = useState('invalid-email');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const emailInvalid =
    sampleEmail.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sampleEmail);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          UI Primitives · Accessible Defaults · Dual-Theme Ready
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          Component Kit
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Composable building blocks located in{' '}
          <code className="font-mono text-xs text-slate-800 dark:text-slate-200">
            src/components/ui
          </code>
          . Every primitive supports keyboard focus states and light/dark surfaces.
        </p>
      </section>

      {/* Buttons */}
      <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Buttons
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consistent touch targets and single-line labels across four variants.
            </p>
          </div>
          <span className="font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
            Interactions: {clickCount}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 px-6 py-5">
          <Button
            variant="primary"
            onClick={() => {
              setClickCount((c) => c + 1);
              pushToast({ title: 'Primary action triggered', variant: 'info' });
            }}
          >
            Primary Action
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setClickCount((c) => c + 1);
              pushToast({ title: 'Secondary action triggered', variant: 'info' });
            }}
          >
            Secondary
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setClickCount((c) => c + 1);
              pushToast({ title: 'Ghost action triggered', variant: 'info' });
            }}
          >
            Ghost Button
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setClickCount((c) => c + 1);
              pushToast({ title: 'Destructive button clicked', variant: 'warning' });
            }}
          >
            Delete Record
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* Form Inputs */}
      <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Form Inputs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Accessible label association, helper text, and live validation feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 py-5 md:grid-cols-2">
          <Input
            label="Project Name"
            value={sampleName}
            onChange={(event) => setSampleName(event.target.value)}
            helperText="Used as the display title in metadata and page headers."
            placeholder="Enter project name"
          />
          <Input
            label="Notification Email"
            type="email"
            value={sampleEmail}
            onChange={(event) => setSampleEmail(event.target.value)}
            error={emailInvalid ? 'Enter a valid email address (e.g. dev@example.com).' : undefined}
            helperText="Validates automatically as you type."
            placeholder="dev@example.com"
          />
        </div>
      </section>

      {/* Feedback & Dialogs */}
      <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Notifications & Dialogs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Live-region toast queue and keyboard-dismissible modal dialog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 px-6 py-5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              pushToast({
                title: 'Changes saved',
                description: 'Configuration updated in local storage.',
                variant: 'success',
              })
            }
          >
            Success Toast
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              pushToast({
                title: 'Review required',
                description: 'Environment variable APP_URL is not configured yet.',
                variant: 'warning',
              })
            }
          >
            Warning Toast
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              pushToast({
                title: 'Request failed',
                description: 'Unable to reach remote API endpoint.',
                variant: 'error',
              })
            }
          >
            Error Toast
          </Button>
          <Button size="sm" onClick={() => setDemoModalOpen(true)}>
            Open Dialog
          </Button>
        </div>
      </section>

      {/* Typography Scale */}
      <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Typography Tokens
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Plus Jakarta Sans for headings, DM Sans for UI copy, and JetBrains Mono for code and numeric columns.
          </p>
        </div>

        <div className="divide-y divide-slate-200 px-6 dark:divide-slate-800">
          <div className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-baseline">
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Display / Plus Jakarta Sans
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Fast, modular React applications
            </span>
          </div>
          <div className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-baseline">
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Body / DM Sans
            </span>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Clean hierarchy and high contrast designed for everyday readability.
            </span>
          </div>
          <div className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-baseline">
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Data / JetBrains Mono
            </span>
            <span className="font-mono text-sm tabular-nums text-slate-900 dark:text-slate-100">
              01,234.56 · 2026-11-24 · src/App.tsx
            </span>
          </div>
        </div>
      </section>

      <Modal
        open={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Example Dialog"
        description="Press Escape or click outside this dialog to dismiss it."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDemoModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setDemoModalOpen(false);
                pushToast({
                  title: 'Dialog confirmed',
                  variant: 'success',
                });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Reuse the <code className="font-mono text-xs">Modal</code> component for
          confirmation flows, create/edit forms, or detail drawers without relying on
          browser alerts.
        </p>
      </Modal>
    </div>
  );
}
