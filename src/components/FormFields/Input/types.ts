import { CollapseProps } from '../../Collapse';
import { InputProps } from '../../Fields/Input';
import { TooltipProps } from '../../Tooltip/types';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';
import { FieldLabelProps } from '../FieldLabel';

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
  Pick<CollapseProps, 'isToggleHidden'>;

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
