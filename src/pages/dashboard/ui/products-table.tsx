import { useNavigate } from 'react-router-dom';

import { useProductsQuery } from 'shared/api/product/product.queries';
import { formatPrice } from 'shared/lib/format-price';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'shared/ui/table';

export function ProductsTable() {
  const navigate = useNavigate();

  function handleTableRowClick(productId: string) {
    navigate(`/products/${productId}/edit`);
  }

  const { data: products, isLoading, isError, error } = useProductsQuery();

  if (isLoading) return null;
  if (isError && error instanceof Error) return <div className="text-red-500">{error.message}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] font-bold">Артикул</TableHead>
          <TableHead className="font-bold">Слаг</TableHead>
          <TableHead className="font-bold">Название</TableHead>
          <TableHead className="font-bold">Категория(и)</TableHead>
          <TableHead className="font-bold">В наличии</TableHead>
          <TableHead className="font-bold">Цена</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((p) => (
          <TableRow key={p.id} onClick={() => handleTableRowClick(p.id)} className="cursor-pointer">
            <TableCell>{p.sku}</TableCell>
            <TableCell>{p.slug}</TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>
              {p.categories.map((c, index) => (
                <span>
                  {c}
                  {p.categories.length - 1 === index ? '' : ', '}
                </span>
              ))}
            </TableCell>
            <TableCell>
              {p.in_stock ? (
                <p className="text-united-nations-blue">В наличии</p>
              ) : (
                <p className="text-red-500">Нет в наличии</p>
              )}
            </TableCell>
            <TableCell>{formatPrice(p.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
