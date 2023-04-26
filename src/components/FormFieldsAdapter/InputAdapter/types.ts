import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import {
  InputFormFieldProps,
  InputWithTooltipFormFieldProps,
  InputWithCollapseFormFieldProps,
} from '../../FormFields';

type AdapterProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  control: Control<FormValues>;
};

export type InputAdapterProps<FormValues extends FieldValues> = Omit<
  InputFormFieldProps,
  'value' | 'name' | 'isValid' | 'errorMessage' | 'ariaLabel'
> &
  AdapterProps<FormValues> & {
    formatError?: (error: FieldError) => undefined | string;
  };

export type InputWithCollapseAdapterProps<FormValues extends FieldValues> =
  Omit<
    InputWithCollapseFormFieldProps,
    'value' | 'name' | 'isValid' | 'errorMessage' | 'ariaLabel'
  > &
    AdapterProps<FormValues> & {
      formatError?: (error: FieldError) => undefined | string;
    };

export type InputWithTooltipAdapterProps<FormValues extends FieldValues> = Omit<
  InputWithTooltipFormFieldProps,
  'value' | 'name' | 'isValid' | 'errorMessage'
> &
  AdapterProps<FormValues> & {
    formatError?: (error: FieldError) => undefined | string;
  };
