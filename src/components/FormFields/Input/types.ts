import { InputProps } from '../../Fields/Input';
import { FieldLabelProps } from '../FieldLabel';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';
import { CollapseControllerProps } from '../../Collapse';
import { TooltipProps } from '../../Tooltip/types';

export type InputFormFieldProps = Omit<
  InputProps,
  'id' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isLabelHidden' | 'isDescriptionHidden' | 'columnIndex'
  >;

export type InputWithCollapseFormFieldProps = InputFormFieldProps &
  Pick<CollapseControllerProps, 'isToggleHidden'>;

export type InputWithTooltipFormFieldProps = Pick<
  InputProps,
  | 'name'
  | 'type'
  | 'size'
  | 'value'
  | 'placeholder'
  | 'isValid'
  | 'isReadOnly'
  | 'isRequired'
  | 'isDisabled'
  | 'onBlur'
  | 'onFocus'
  | 'onChange'
  | 'onIconClick'
  | 'valueGetter'
  | 'formatValue'
  | 'Icon'
  | 'iconAriaLabel'
  | 'inputClassName'
> &
  Required<Pick<InputProps, 'ariaLabel'>> &
  Pick<CommonFormFieldWrapperProps, 'errorMessage'> &
  Pick<TooltipProps, 'position'>;

