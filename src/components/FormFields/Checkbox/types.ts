import { CheckboxProps } from '../../Fields/Checkbox';
import { FieldLabelProps } from '../FieldLabel';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';

export type CheckboxFormFieldProps = Omit<
  CheckboxProps,
  'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isDescriptionHidden' | 'columnIndex'
  > & {
    placeholder?: string;
  };
