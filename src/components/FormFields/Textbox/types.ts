import { CollapseControllerProps } from '../../Collapse';
import { TextboxProps } from '../../Fields/Textbox';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';
import { FieldLabelProps } from '../FieldLabel';

export type TextboxFormFieldProps = Omit<
  TextboxProps,
  'id' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isLabelHidden' | 'isDescriptionHidden' | 'columnIndex'
  >;

export type TextboxWithCollapseFormFieldProps = TextboxFormFieldProps &
  Pick<CollapseControllerProps, 'isToggleHidden'>;
