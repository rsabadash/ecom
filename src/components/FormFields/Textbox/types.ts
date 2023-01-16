import { TextboxProps } from '../../Fields/Textbox';
import { FieldLabelProps } from '../FieldLabel';

export type TextboxFormFieldProps = Omit<
  TextboxProps,
  'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> & {
    errorMessage?: string;
    isDescriptionHidden?: boolean;
  };
