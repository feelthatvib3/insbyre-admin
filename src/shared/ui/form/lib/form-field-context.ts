import { createContext } from 'react';

import type { FormFieldContextValue } from 'shared/ui/form';

export const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);
