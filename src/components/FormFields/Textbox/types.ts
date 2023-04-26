import { TextboxProps } from '../../Fields/Textbox';
import { FieldLabelProps } from '../FieldLabel';
import { CollapseControllerProps } from '../../Collapse';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';

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
