import { FC } from 'react';
import clsx from 'clsx';

import classes from './styles/index.module.css';

import { useTranslation } from '../../IntlProvider';
import { Label } from '../../Label';
import { FieldLabelProps } from './types';

export const FieldLabel: FC<FieldLabelProps> = ({
  label,
  htmlFor,
  isValid,
  isReadOnly,
  isRequired,
  fieldLabelClassName,
}) => {
  const { translate } = useTranslation();
  const itemLabel =
    isRequired && !isReadOnly
      ? `${label} (${translate('required').toLowerCase()})`
      : label;

  const fieldLabelClassNames = clsx(
    classes.fieldLabel,
    {
      [classes.fieldLabel_error]: !isValid,
      [classes.fieldLabel_readOnly]: isReadOnly,
    },
    fieldLabelClassName,
  );

  return (
    <Label htmlFor={htmlFor} labelClassName={fieldLabelClassNames}>
      {itemLabel}
    </Label>
  );
};
