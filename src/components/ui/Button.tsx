import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400',
  secondary:
    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-600 dark:text-white dark:hover:bg-red-500',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3.5 py-1.5 text-xs',
  md: 'min-h-10 px-4 py-2 text-sm',
  lg: 'min-h-11 px-5 py-2.5 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
