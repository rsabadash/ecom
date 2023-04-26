import { DropdownProps } from '../../Fields/Dropdown';
import { FieldLabelProps } from '../FieldLabel';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';
import { TooltipProps } from '../../Tooltip/types';

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
