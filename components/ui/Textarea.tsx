import { cn } from '@/lib/utils';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, hint, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={id} className="text-sm font-black text-black dark:text-white uppercase tracking-widest block transition-colors">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            'flex min-h-[120px] w-full bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-black dark:text-white brutal-border transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea';
