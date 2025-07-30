import { createContext } from 'react';

import type { FormItemContextValue } from 'shared/ui/form';

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);
