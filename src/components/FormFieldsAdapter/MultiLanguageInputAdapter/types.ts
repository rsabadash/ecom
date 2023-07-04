import { Control, FieldValues, Path } from 'react-hook-form';

import { InputAdapterProps } from '../InputAdapter';

export type MultiLanguageInputAdapterProps<FormValues extends FieldValues> =
  Omit<
    InputAdapterProps<FormValues>,
    'placeholder' | 'formatError' | 'type'
  > & {
    placeholderTranslation: string;
    isToggleHidden?: boolean;
    isInitiallyExpand?: boolean;
    isRequiredAllLanguages?: boolean;
    name: Path<FormValues>;
    control: Control<FormValues>;
  };
