import { TagIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';

import { cn } from 'shared/lib/cn';

export function CreateCategoryButton({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      href="/new/category"
      className={cn(
        'border-united-nations-blue/25 bg-united-nations-blue/5 hover:bg-united-nations-blue/10 hover:border-united-nations-blue/30 flex cursor-pointer items-center gap-x-2 rounded-xl border px-4 py-3 backdrop-blur-sm transition',
        className
      )}
      {...props}
    >
      <TagIcon weight="fill" className="text-united-nations-blue" />
      Создать новую категорию
    </a>
  );
}
