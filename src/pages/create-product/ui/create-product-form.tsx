import { zodResolver } from '@hookform/resolvers/zod';
import { PackageIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useCreateProductMutation } from 'shared/api/product/product.mutations';
import { supabase } from 'shared/api/supabase';
import type { Category } from 'shared/types/category';
import type { ProductWithoutIdAndDate } from 'shared/types/product';
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
import { ImageUploader } from 'shared/ui/image-uploader';
import { Input } from 'shared/ui/input';
import { MultiSelect } from 'shared/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'shared/ui/select';
import { Spinner } from 'shared/ui/spinner';
import { Textarea } from 'shared/ui/textarea';

const schema = z.object({
  name: z.string().min(2, { message: 'Название должно содержать минимум 2 символа.' }).max(50, {
    message: 'Название слишком длинное.'
  }),
  slug: z
    .string()
    .min(2, { message: 'Слаг должен содержать минимум 2 символа.' })
    .max(50, { message: 'Слаг слишком длинный.' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Слаг может содержать только строчные буквы, цифры и дефисы.'
    }),
  sku: z.string().min(2, { message: 'SKU должен содержать минимум 2 символа.' }).max(50, {
    message: 'SKU слишком длинный.'
  }),
  price: z.int().positive({ message: 'Цена должна быть положительным числом.' }),
  images: z.array(z.instanceof(File)).min(1, { message: 'Добавьте хотя бы одно изображение.' }),
  in_stock: z.boolean(),
  description: z.string().refine((val) => val === null || val.trim().length > 0, {
    message: 'Описание не может быть пустым.'
  }),
  care: z.string().nullable(),
  materials: z.string().nullable(),
  fit: z.string().nullable(),
  shipping: z.string().nullable(),
  returns: z.string().nullable(),
  sizes: z.array(z.string()).nullable(),
  categories: z.array(z.string()).min(1, { message: 'Выберите хотя бы одну категорию.' })
});

interface CreateProductFormProps {
  categories: Category[];
}

export function CreateProductForm({ categories }: CreateProductFormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      slug: '',
      sku: '',
      price: 0,
      images: [],
      in_stock: true,
      description: undefined,
      care: null,
      materials: null,
      fit: null,
      shipping: null,
      returns: null,
      sizes: null,
      categories: []
    }
  });

  const { mutate, isPending } = useCreateProductMutation({
    options: {
      onSuccess: () => {
        form.reset();
        navigate('/', { replace: true });
      },
      onError: (e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setError(e.message);
      }
    }
  });

  async function onSubmit(
    values: Omit<ProductWithoutIdAndDate, 'thumbnail' | 'images'> & { images: File[] }
  ) {
    setError(null);
    setIsUploading(true);

    try {
      setIsUploading(true);

      const uploads = values.images.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error } = await supabase.storage.from('images').upload(filePath, file);
        if (error) throw error;

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
        return urlData.publicUrl;
      });

      const urls = await Promise.all(uploads);

      const payload: ProductWithoutIdAndDate = {
        ...values,
        images: urls,
        thumbnail: urls[0] ?? null
      };

      mutate(payload);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки изображений.');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <WarningCircleIcon weight="fill" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <div className="grid items-start gap-4 md:grid-cols-2 md:gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Брелок" />
                </FormControl>
                <FormDescription>
                  Название товара, которое увидит клиент. Например: <code>Брелок</code>.
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
                <FormLabel>Слаг</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="keychain" />
                </FormControl>
                <FormDescription>
                  URL-идентификатор товара. Только латиница, цифры и дефисы. Например:{' '}
                  <code>keychain</code>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="INS-KCH-001" />
                </FormControl>
                <FormDescription>
                  Уникальный код товара, отображается клиенту. Формат: <code>INS-KCH-001</code>,
                  где:
                  <span className="mt-1 block list-outside space-y-0.5">
                    <span className="block">
                      <code>INS</code> — название бренда;
                    </span>
                    <span className="block">
                      <code>KCH</code> — тип товара (например, брелок);
                    </span>
                    <span className="block">
                      <code>001</code> — порядковый номер.
                    </span>
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Категории</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={categories.map((cat) => ({ label: cat.name, value: cat.slug }))}
                    value={categories
                      .filter((cat) => field.value?.includes(cat.slug))
                      .map((cat) => ({ label: cat.name, value: cat.slug }))}
                    onChange={(selected) => field.onChange(selected.map((s) => s.value))}
                    onBlur={field.onBlur}
                    error={fieldState.error}
                    placeholder="Выберите одну или несколько категорий"
                  />
                </FormControl>
                <FormDescription>
                  Выберите одну или несколько категорий, к которым относится товар.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="700"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Цена товара. Например: <code>700</code>. Показывается на карточке товара и при
                  оформлении заказа.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value ?? ''} className="min-h-32" />
                </FormControl>
                <FormDescription>
                  Основное описание товара. Расскажите, что делает его особенным, какие есть
                  особенности.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="in_stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>В наличии</FormLabel>
                <FormControl>
                  <Select value={field.value + ''} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите значение" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="true">Да</SelectItem>
                        <SelectItem value="false">Нет</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Основное описание товара. Расскажите, что делает его особенным, какие есть
                  особенности.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Размеры</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={[
                      { label: 'XS', value: 'XS' },
                      { label: 'XS/S', value: 'XS/S' },
                      { label: 'S', value: 'S' },
                      { label: 'M', value: 'M' },
                      { label: 'M/L', value: 'M/L' },
                      { label: 'L', value: 'L' },
                      { label: 'XL', value: 'XL' },
                      { label: 'XXL', value: 'XXL' },
                      { label: 'One size', value: 'One size' }
                    ]}
                    value={(field.value ?? []).map((size) => ({ label: size, value: size }))}
                    onChange={(selected) => field.onChange(selected.map((s) => s.label))}
                    onBlur={field.onBlur}
                    error={fieldState.error}
                    placeholder="Выберите доступные размеры"
                  />
                </FormControl>
                <FormDescription>
                  Размеры, в которых доступен товар. Например: <code>S, M, L</code>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {['care', 'materials', 'fit', 'shipping', 'returns'].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof z.infer<typeof schema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      {
                        care: 'Уход за изделием',
                        materials: 'Материалы',
                        fit: 'Посадка',
                        shipping: 'Доставка',
                        returns: 'Возврат'
                      }[fieldName]
                    }
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={typeof field.value === 'string' ? field.value : ''}
                    />
                  </FormControl>
                  <FormDescription>
                    {
                      {
                        care: 'Инструкции по уходу за изделием: как стирать, сушить, хранить.',
                        materials: 'Основные материалы изделия: хлопок, металл, пластик и т.д.',
                        fit: 'Как сидит изделие: оверсайз, приталенно, свободно.',
                        shipping: 'Условия и сроки доставки для клиента.',
                        returns: 'Условия возврата и обмена товара.'
                      }[fieldName]
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Controller
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Изображения</FormLabel>
              <FormControl>
                <ImageUploader files={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>Загрузите одно или несколько изображений товара.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isUploading || isPending} type="submit" size="lg" variant="primary">
          {isUploading || isPending ? <Spinner /> : <PackageIcon weight="fill" />}
          Добавить товар
        </Button>
      </form>
    </Form>
  );
}
