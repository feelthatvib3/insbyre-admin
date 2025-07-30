import { TrashIcon } from '@phosphor-icons/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  files: (File | string)[];
  onChange: (files: (File | string)[]) => void;
}

export function ImageUploader({ files, onChange }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...files, ...acceptedFiles]);
    },
    [files, onChange]
  );

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="hover:border-united-nations-blue border-united-nations-blue/25 text-muted-foreground flex min-h-28 cursor-pointer items-center justify-center rounded-lg border border-dashed bg-white p-4 text-center text-sm transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Перетащите файлы...</p> : <p>Нажмите или перетащите файлы сюда</p>}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {files.map((file, i) => {
            const url = typeof file === 'string' ? file : URL.createObjectURL(file);
            return (
              <div key={i} className="relative aspect-square">
                <img src={url} alt="preview" className="size-full rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 cursor-pointer rounded-lg bg-red-500/70 p-1.5 backdrop-blur-xs"
                >
                  <TrashIcon size={16} weight="bold" color="white" className="shrink-0" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
