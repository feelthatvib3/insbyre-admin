import { CategoriesTable } from 'pages/dashboard/ui/categories-table';
import { ProductsTable } from 'pages/dashboard/ui/products-table';

import { useSession } from 'features/auth';
import { CreateCategoryButton } from 'features/category/create';
import { LogoutButton } from 'features/logout';
import { CreateNewProductButton } from 'features/product/create';

import { withAuthGuard } from 'shared/lib/with-auth-guard';
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui/avatar';

function Page() {
  const { session } = useSession();
  if (!session) return;

  const { full_name, avatar_url, user_name } = session.user.user_metadata;

  return (
    <main>
      <div className="mx-auto min-h-dvh w-full max-w-5xl space-y-8 px-4 py-8 lg:py-12">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="font-display flex items-center gap-x-2 text-lg md:text-2xl">
            <a
              href={`https://github.com/${user_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-united-nations-blue/5 flex items-center gap-x-2 rounded-full py-1 pr-3 pl-2 transition"
            >
              <Avatar className="size-5 md:size-7">
                <AvatarImage src={avatar_url} alt={`${user_name}'s avatar`} />
                <AvatarFallback>INS</AvatarFallback>
              </Avatar>
              <span className="text-united-nations-blue truncate">{full_name}</span>
            </a>
          </div>
          <LogoutButton />
        </div>

        {/* quick actions section */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <CreateNewProductButton />
            <CreateCategoryButton />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl">Категории</h2>
          <CategoriesTable />
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl">Товары</h2>
          <ProductsTable />
        </section>
      </div>
    </main>
  );
}
const DashboardPage = withAuthGuard(Page);

export { DashboardPage };
