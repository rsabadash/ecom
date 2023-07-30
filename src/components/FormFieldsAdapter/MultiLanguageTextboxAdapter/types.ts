import { Control, FieldValues, Path } from 'react-hook-form';

import { TextboxAdapterProps } from '../TextboxAdapter';

export type MultiLanguageTextboxAdapterProps<FormValues extends FieldValues> =
  Omit<TextboxAdapterProps<FormValues>, 'placeholder' | 'formatError'> & {
    placeholderTranslation: string;
    isToggleHidden?: boolean;
    isInitiallyExpand?: boolean;
    isRequiredAllLanguages?: boolean;
    name: Path<FormValues>;
    control: Control<FormValues>;
  };
