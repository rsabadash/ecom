import { CheckboxProps } from '../../Fields/Checkbox';
import { FieldLabelProps } from '../FieldLabel';

export type CheckboxFormFieldProps = Omit<
  CheckboxProps,
  'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> & {
    placeholder?: string;
    errorMessage?: string;
    isDescriptionHidden?: boolean;
  };
