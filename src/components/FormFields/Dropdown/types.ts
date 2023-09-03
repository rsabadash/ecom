import { DropdownProps } from '../../Fields/Dropdown';
import { TooltipProps } from '../../Tooltip/types';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';
import { FieldLabelProps } from '../FieldLabel';

export type DropdownFormFieldProps = Omit<
  DropdownProps,
  'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isLabelHidden' | 'isDescriptionHidden' | 'columnIndex'
  >;

export type DropdownWithTooltipFormFieldProps = Pick<
  DropdownProps,
  | 'name'
  | 'size'
  | 'value'
  | 'items'
  | 'customItems'
  | 'placeholder'
  | 'isValid'
  | 'isRequired'
  | 'isDisabled'
  | 'isOpen'
  | 'hasMultiselect'
  | 'onBlur'
  | 'onChange'
  | 'itemValueGetter'
  | 'isReadOnly'
> &
  Required<Pick<DropdownProps, 'ariaLabel'>> &
  Pick<CommonFormFieldWrapperProps, 'errorMessage'> &
  Pick<TooltipProps, 'position'>;
