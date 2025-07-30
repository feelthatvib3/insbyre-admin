import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircleIcon, TagIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateCategoryMutation } from 'shared/api/category/category.mutations';
import { Alert, AlertTitle } from 'shared/ui/alert';
import { Button } from 'shared/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'shared/ui/form';
import { Input } from 'shared/ui/input';
import { Spinner } from 'shared/ui/spinner';

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Название должно содержать минимум 2 символа.' })
    .max(50, { message: 'Название слишком длинное.' }),
  slug: z
    .string()
    .min(2, { message: 'Слаг должен содержать минимум 2 символа.' })
    .max(50, { message: 'Слаг слишком длинный.' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Слаг может содержать только строчные буквы, цифры и дефисы.'
    })
});

export function CreateCategoryForm() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      slug: ''
    }
  });

  const { mutate, isPending } = useCreateCategoryMutation({
    options: {
      onSuccess: (c) => {
        setSuccessMessage(`Категория «${c.name}» успешно создана.`);
        form.reset();
      },
      onError: (e) => {
        setError(e.message);
      }
    }
  });

  async function onSubmit(category: z.infer<typeof schema>) {
    if (successMessage) setSuccessMessage(null);
    if (error) setError(null);

    mutate(category);
  }

  useEffect(() => {
    const timeout = setTimeout(function () {
      setSuccessMessage(null);
    }, 3 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [successMessage]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {successMessage ? (
          <Alert variant="success">
            <CheckCircleIcon weight="fill" />
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        ) : null}
        {error ? (
          <Alert variant="destructive">
            <WarningCircleIcon weight="fill" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        ) : null}

        <div className="grid items-start gap-4 md:grid-cols-2 md:gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название категории</FormLabel>
                <FormControl>
                  <Input placeholder="Новинки" {...field} />
                </FormControl>
                <FormDescription>
                  Название, которое будет отображаться на сайте. Пользователи будут видеть его в
                  списках и фильтрах.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Слаг (URL-имя)</FormLabel>
                <FormControl>
                  <Input placeholder="new" {...field} />
                </FormControl>
                <FormDescription>
                  Упрощённая версия названия, используется в адресной строке сайта. Только латинские
                  буквы, без пробелов, всё в нижнем регистре. Например, для <code>Новинки</code> —{' '}
                  <code>new</code>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          size="lg"
          type="submit"
          variant="primary"
          className="font-semibold"
        >
          {isPending ? <Spinner /> : <TagIcon weight="fill" />}
          Создать
        </Button>
      </form>
    </Form>
  );
}
