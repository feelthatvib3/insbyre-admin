import { useParams } from 'react-router-dom';

import { EditCategoryForm } from 'pages/edit-category/ui/edit-category-form';

import { BackButton } from 'features/back-button';

import { useGetCategoryByIdQuery } from 'shared/api/category/category.queries';
import { withAuthGuard } from 'shared/lib/with-auth-guard';

function Page() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data: category } = useGetCategoryByIdQuery(categoryId!);

  return (
    <main>
      <div className="mx-auto min-h-dvh w-full max-w-5xl space-y-8 px-4 py-8 lg:py-12">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="font-display text-2xl">Редактирование категории</h1>
          <BackButton />
        </div>
        {category ? <EditCategoryForm category={category} /> : <p>Загрузка...</p>}
      </div>
    </main>
  );
}
const EditCategoryPage = withAuthGuard(Page);

export { EditCategoryPage };
