import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#fde047] text-black brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#facc15]', // Yellow
  secondary:
    'bg-black text-white dark:bg-white dark:text-black brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#27272a] dark:hover:bg-gray-200', // Black
  ghost:
    'bg-transparent text-black dark:text-white hover:bg-[#e4e4e7] dark:hover:bg-zinc-800 border-2 border-transparent hover:border-black dark:hover:border-white',
  danger:
    'bg-[#f87171] text-black brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#ef4444]', // Red
  outline:
    'bg-white dark:bg-black text-black dark:text-white brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#fde047] dark:hover:bg-[#fde047] dark:hover:text-black', // White -> Yellow
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-xs gap-1.5',
  md: 'h-12 px-6 text-sm gap-2',
  lg: 'h-14 px-8 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            MEMUAT
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
