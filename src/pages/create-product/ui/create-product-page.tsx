import { CreateProductForm } from 'pages/create-product/ui/create-product-form';

import { BackButton } from 'features/back-button';

import { useCategoriesQuery } from 'shared/api/category/category.queries';
import { withAuthGuard } from 'shared/lib/with-auth-guard';

function Page() {
  const { data: categories } = useCategoriesQuery();

  return (
    <main>
      <div className="mx-auto min-h-dvh w-full max-w-5xl space-y-8 px-4 py-8 lg:py-12">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="font-display text-2xl">Добавление нового товара</h1>
          <BackButton />
        </div>
        {categories ? <CreateProductForm categories={categories} /> : null}
      </div>
    </main>
  );
}
const CreateProductPage = withAuthGuard(Page);

export { CreateProductPage };
