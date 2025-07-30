import { XIcon } from '@phosphor-icons/react';
import { Command as CommandPrimitive } from 'cmdk';
import { type KeyboardEvent, useCallback, useRef, useState } from 'react';
import type { FieldError } from 'react-hook-form';

import { cn } from 'shared/lib/cn';
import { Badge } from 'shared/ui/badge/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from 'shared/ui/command';

interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: MultiSelectOption[];
  onChange: (value: MultiSelectOption[]) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: FieldError;
}

export function MultiSelect({
  options,
  value,
  onChange,
  error,
  placeholder = 'Выберите...'
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleUnselect = useCallback(
    (item: MultiSelectOption) => {
      onChange(value.filter((s) => s.value !== item.value));
    },
    [value, onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && inputRef.current?.value === '') {
        onChange(value.slice(0, -1));
      }
      if (e.key === 'Escape') inputRef.current?.blur();
    },
    [value, onChange]
  );

  const filtered = options.filter((opt) => !value.find((v) => v.value === opt.value));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible">
      <div
        className={cn(
          'group focus-within:ring-ring/50 border-united-nations-blue/25 focus-within:border-united-nations-blue rounded-xl border bg-white py-3 text-base transition-[color,box-shadow] focus-within:ring-[3px]',
          error
            ? 'focus-within:ring-destructive/20 focus-within:border-destructive border-destructive'
            : '',
          value.length > 0 ? 'p-2' : 'px-4'
        )}
      >
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <Badge key={item.value} variant="primary" className="text-base">
              {item.label}
              <button
                className="cursor-pointer hover:text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleUnselect(item)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <XIcon size={16} />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="placeholder:text-muted-foreground flex-1 bg-transparent outline-none"
          />
        </div>
      </div>

      {open && filtered.length > 0 && (
        <div className="relative mt-2">
          <CommandList>
            <div className="animate-in bg-popover text-popover-foreground absolute top-0 z-10 w-full rounded-xl border shadow-md">
              <CommandGroup className="h-full overflow-auto">
                {filtered.map((item) => (
                  <CommandItem
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue('');
                      onChange([...value, item]);
                    }}
                    className="hover:bg-united-nations-blue/5 cursor-pointer rounded-lg p-2 text-base"
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </CommandList>
        </div>
      )}
    </Command>
  );
}
