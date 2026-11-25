import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import type { ToastMessage, ToastVariant } from '../types/app';

interface ToastContextValue {
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastIcon({ variant }: { variant: ToastVariant }) {
  switch (variant) {
    case 'success':
      return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />;
    default:
      return <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3600);
  }, []);

  const value = useMemo(
    () => ({ pushToast, dismissToast }),
    [pushToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed right-5 bottom-5 z-50 flex w-full max-w-sm flex-col gap-2.5"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              role="status"
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <div className="mt-0.5">
                <ToastIcon variant={toast.variant} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-zinc-900 dark:text-zinc-100">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
