import { TrashSimpleIcon } from '@phosphor-icons/react';
import { type ComponentProps, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteCategoryById } from 'shared/api/category/category.mutations';
import { Button } from 'shared/ui/button';
import { Spinner } from 'shared/ui/spinner';

interface DeleteCategoryButtonProps extends ComponentProps<'button'> {
  categoryId: string;
}

export function DeleteCategoryButton({ categoryId, ...props }: DeleteCategoryButtonProps) {
  const navigate = useNavigate();

  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const { mutate, isPending } = useDeleteCategoryById({
    options: {
      onSuccess: () => {
        navigate('/', { replace: true });
      }
    }
  });

  if (isConfirming) {
    return (
      <div className="flex items-center gap-x-2">
        <Button
          type="button"
          size="lg"
          variant="destructive"
          onClick={() => {
            setIsConfirming(false);
            mutate(categoryId);
          }}
        >
          <TrashSimpleIcon size={16} weight="fill" />
          Да, удалить
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={() => setIsConfirming(false)}>
          Отменить
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={() => setIsConfirming(true)}
      size="lg"
      variant="destructive"
      {...props}
    >
      {isPending ? <Spinner /> : <TrashSimpleIcon size={16} weight="fill" />}
      Удалить категорию
    </Button>
  );
}
