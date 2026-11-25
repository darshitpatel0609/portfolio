import { useId, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Input({
  label,
  helperText,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-800 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={`min-h-10 w-full rounded-lg border bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${
          error
            ? 'border-red-500 dark:border-red-500'
            : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}
