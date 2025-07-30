import { useNavigate } from 'react-router-dom';

import { useCategoriesQuery } from 'shared/api/category/category.queries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'shared/ui/table';

export function CategoriesTable() {
  const navigate = useNavigate();

  function handleTableRowClick(categoryId: string) {
    navigate(`/categories/${categoryId}/edit`);
  }

  const { data: categories, isLoading, isError, error } = useCategoriesQuery();

  if (isLoading) return null;
  if (isError && error instanceof Error) return <div className="text-red-500">{error.message}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] font-bold">Название</TableHead>
          <TableHead className="font-bold">Слаг</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => (
          <TableRow
            key={category.id}
            onClick={() => handleTableRowClick(category.id)}
            className="cursor-pointer"
          >
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
