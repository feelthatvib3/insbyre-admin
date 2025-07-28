import { PackageIcon, TagIcon } from '@phosphor-icons/react';

import { useAuthUser } from 'features/github-auth';
import { LogoutButton } from 'features/logout';

export function DashboardPage() {
  const { data } = useAuthUser();
  console.log(data?.login);
  return (
    <main className="bg-background flowers-01">
      <div className="mx-auto min-h-dvh w-full max-w-5xl space-y-4 px-4 py-8 lg:space-y-8 lg:py-12">
        {/* header */}
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl">
            Привет, <span className="text-united-nations-blue">{data?.login}</span>
          </h1>
          <LogoutButton />
        </div>

        {/* quick actions section */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <button className="border-united-nations-blue/25 bg-united-nations-blue/5 hover:bg-united-nations-blue/10 hover:border-united-nations-blue/30 flex cursor-pointer items-center gap-x-2 rounded-xl border px-4 py-3 backdrop-blur-sm transition">
              <PackageIcon weight="fill" className="text-united-nations-blue" />
              Добавить новый товар
            </button>
            <button className="border-united-nations-blue/25 bg-united-nations-blue/5 hover:bg-united-nations-blue/10 hover:border-united-nations-blue/30 flex cursor-pointer items-center gap-x-2 rounded-xl border px-4 py-3 backdrop-blur-sm transition">
              <TagIcon weight="fill" className="text-united-nations-blue" />
              Создать новую категорию
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
