import { DropdownProps } from '../../Fields/Dropdown';
import { FieldLabelProps } from '../FieldLabel';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';

export type DropdownFormFieldProps = Omit<
  DropdownProps,
  'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isDescriptionHidden' | 'columnIndex'
  >;
