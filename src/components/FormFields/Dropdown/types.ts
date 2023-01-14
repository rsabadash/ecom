import { DropdownProps } from '../../Fields/Dropdown';
import { FieldLabelProps } from '../FieldLabel';

export type DropdownFormFieldProps = Omit<
  DropdownProps,
  'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> & {
    errorMessage?: string;
    isDescriptionHidden?: boolean;
  };
