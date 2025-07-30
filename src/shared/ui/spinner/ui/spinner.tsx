import { SpinnerIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';

import { cn } from 'shared/lib/cn';

interface SpinnerProps extends ComponentProps<'div'> {
  containerClassName?: string;
  className?: string;
  size?: number;
}

export function Spinner({ className = '', size = 16, containerClassName = '' }: SpinnerProps) {
  return (
    <div className={containerClassName}>
      <SpinnerIcon size={size} weight="bold" className={cn('animate-spin', className)} />
    </div>
  );
}
