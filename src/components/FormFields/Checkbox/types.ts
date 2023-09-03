import { CheckboxProps } from '../../Fields/Checkbox';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';
import { FieldLabelProps } from '../FieldLabel';

export type CheckboxFormFieldProps = Omit<
  CheckboxProps,
  'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label' | 'size'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isDescriptionHidden' | 'columnIndex'
  > & {
    placeholder?: string;
  };
