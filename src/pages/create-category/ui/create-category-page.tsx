import { CreateCategoryForm } from 'pages/create-category/ui/create-category-form';

import { BackButton } from 'features/back-button';

import { withAuthGuard } from 'shared/lib/with-auth-guard';

function Page() {
  return (
    <main>
      <div className="mx-auto min-h-dvh w-full max-w-5xl space-y-8 px-4 py-8 lg:py-12">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="font-display text-2xl">Создание новой категории</h1>
          <BackButton />
        </div>
        <CreateCategoryForm />
      </div>
    </main>
  );
}
const CreateCategoryPage = withAuthGuard(Page);

export { CreateCategoryPage };
