import { cn, getMediaTypeColor, getMediaTypeLabel } from '@/lib/utils';
import type { MediaType } from '@/types';

interface BadgeProps {
  children?: React.ReactNode;
  mediaType?: MediaType;
  className?: string;
  variant?: 'default' | 'media';
}

export function Badge({ children, mediaType, className, variant = 'default' }: BadgeProps) {
  if (mediaType) {
    return (
      <span
        className={cn(
          'inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider brutal-shadow',
          getMediaTypeColor(mediaType),
          className
        )}
      >
        {getMediaTypeLabel(mediaType)}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-bold brutal-border brutal-shadow transition-colors',
        variant === 'default'
          ? 'bg-white dark:bg-black text-black dark:text-white'
          : 'bg-[#facc15] text-black',
        className
      )}
    >
      {children}
    </span>
  );
}
