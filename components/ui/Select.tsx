import { cn } from '@/lib/utils';
import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  hint?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, hint, id, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={id} className="text-sm font-black text-black dark:text-white uppercase tracking-widest block transition-colors">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={cn(
            'flex h-12 w-full appearance-none bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-black dark:text-white brutal-border transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 dark:[background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg_xmlns=\'http://www.w3.org/2000/svg\'_fill=\'none\'_viewBox=\'0_0_20_20\'%3E%3Cpath_stroke=\'%23fff\'_stroke-linecap=\'round\'_stroke-linejoin=\'round\'_stroke-width=\'2\'_d=\'m6_8_4_4_4-4\'/%3E%3C/svg%3E")]',
            error && 'border-[#f87171] focus-visible:ring-[#f87171] dark:focus-visible:ring-[#f87171]',
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
Select.displayName = 'Select';
