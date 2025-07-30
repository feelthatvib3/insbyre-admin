import { PackageIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';

export function CreateNewProductButton({ ...props }: ComponentProps<'a'>) {
  return (
    <a
      href="/new/product"
      className="border-united-nations-blue/25 bg-united-nations-blue/5 hover:bg-united-nations-blue/10 hover:border-united-nations-blue/30 flex cursor-pointer items-center gap-x-2 rounded-xl border px-4 py-3 backdrop-blur-sm transition"
      {...props}
    >
      <PackageIcon weight="fill" className="text-united-nations-blue" />
      Добавить новый товар
    </a>
  );
}
