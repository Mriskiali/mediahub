import { cn } from '@/lib/utils';
import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, hint, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={id} className="text-sm font-black text-black dark:text-white uppercase tracking-widest block transition-colors">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'flex h-12 w-full bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-black dark:text-white brutal-border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-[#f87171] focus-visible:ring-[#f87171] dark:focus-visible:ring-[#f87171]',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mt-1 transition-colors">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 text-xs font-bold text-[#f87171] uppercase transition-colors">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
