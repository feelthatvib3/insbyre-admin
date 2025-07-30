import { useParams } from 'react-router-dom';

import { EditProductForm } from 'pages/edit-product/ui/edit-product-form';

import { BackButton } from 'features/back-button';

import { useCategoriesQuery } from 'shared/api/category/category.queries';
import { useGetProductByIdQuery } from 'shared/api/product/product.queries';
import { withAuthGuard } from 'shared/lib/with-auth-guard';

function Page() {
  const { productId } = useParams<{ productId: string }>();

  const { data: categories } = useCategoriesQuery();
  const { data: product } = useGetProductByIdQuery(productId!);

  return (
    <main>
      <div className="mx-auto min-h-dvh w-full max-w-5xl space-y-8 px-4 py-8 lg:py-12">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="font-display text-2xl">Редактирование товара</h1>
          <BackButton />
        </div>
        {product && categories ? (
          <EditProductForm product={product} categories={categories} />
        ) : (
          <p>Загрузка...</p>
        )}
      </div>
    </main>
  );
}
const EditProductPage = withAuthGuard(Page);

export { EditProductPage };
